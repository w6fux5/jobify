import mongoose from 'mongoose';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';

import checkPermissions from '../utils/checkPermissions.js';

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
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({
    numOfPages: 1,
    totalJobs: jobs.length,
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

  res.status(StatusCodes.OK).json({ stats, monthlyApplications: [] });
};
