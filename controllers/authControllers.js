import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError } from '../errors/index.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name) {
    throw new BadRequestError('Please provide name');
  }
  if (!email) {
    throw new BadRequestError('Please provide email');
  }
  if (!password) {
    throw new BadRequestError('Please provide password');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequestError('Email already exists');
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = (req, res) => {
  res.send('login');
};

export const updateUser = (req, res) => {
  res.send('updateUser');
};
