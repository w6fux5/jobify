import { StatusCodes } from 'http-status-codes';

const errorHandleMiddleware = (error, req, res, next) => {
  console.log(error);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong, try again later',
  };
  res.status(defaultError.statusCode).json({ message: error });
};

export default errorHandleMiddleware;
