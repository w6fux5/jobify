import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

// @desc    create a new user & get token
// @route   POST   /api/auth/register
// @access  Public
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
  const token = await user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user,
    token,
    location: user.location,
  });
};

// @desc    User login & get token
// @route   POST   /api/user/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const existsUser = await User.findOne({ email });
  const passwordIsMatch = await existsUser?.matchPassword(password);

  if (!existsUser || !passwordIsMatch) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = existsUser.createJWT();

  res.status(StatusCodes.OK).json({
    token,
    user: existsUser,
    location: existsUser.location,
  });
};

export const updateUser = (req, res) => {
  console.log(req.user);
  res.send('updateUser');
};
