import mongoose from 'mongoose';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';

import checkPermissions from '../utils/checkPermissions.js';
import moment from 'moment';

export const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError('Please provide company and position');
  }

  req.body.createdBy = req.user.userID;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userID,
  };

  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    // 只要有包含search字串的，不分大小寫
    queryObject.position = { $regex: search, $options: 'i' }; // i => 忽略大小寫
  }

  let result = Job.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }

  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'a-z') {
    result = result.sort('position');
  }

  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({
    numOfPages,
    totalJobs,
    jobs,
  });
};

export const updateJob = async (req, res) => {
  const { id: jobID } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please provide company and position');
  }

  const job = await Job.findOne({ _id: jobID });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobID}`);
  }

  checkPermissions(req.user, job.createdBy);

  // runValidators => 執行Schema的驗證邏輯
  const updateJob = await Job.findOneAndUpdate({ _id: jobID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(updateJob);
};

export const deleteJob = async (req, res) => {
  const { id: jobID } = req.params;
  const job = await Job.findOne({ _id: jobID });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobID}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ message: 'Success job removed' });
};

export const showStatus = async (req, res) => {
  let statsFromServer = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  statsFromServer = statsFromServer.reduce((acc, cur) => {
    const { _id: title, count } = cur;
    acc[title] = count;
    return acc;
  }, {});

  const stats = {
    declined: statsFromServer.declined || 0,
    interview: statsFromServer.interview || 0,
    pending: statsFromServer.pending || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map(({ _id, count }) => {
      const { year, month } = _id;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ stats, monthlyApplications });
};
