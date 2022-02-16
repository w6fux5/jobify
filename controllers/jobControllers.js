import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

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

export const updateJob = (req, res) => {
  res.send('update job');
};

export const deleteJob = (req, res) => {
  res.send('delete job');
};

export const showStatus = (req, res) => {
  res.send('show status');
};
