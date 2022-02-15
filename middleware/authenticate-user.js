import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Invalid Token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userID } = payload;
    req.user = { userID };
    console.log(req.user);
  } catch (error) {
    throw new UnauthenticatedError('Invalid Token');
  }
  next();
};

export default authenticateUser;
