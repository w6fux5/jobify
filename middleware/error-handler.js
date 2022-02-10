import { StatusCodes } from 'http-status-codes';

const errorHandleMiddleware = (error, req, res, next) => {
  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong, try again later',
  };

  if (error?.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      error.keyValue
    )} field has to be unique`;
  }

  if (error.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.message = error.message;
    defaultError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(',');
  }

  res.status(defaultError.statusCode).json({ message: defaultError.message });
  // res.status(defaultError.statusCode).json(error);
};

export default errorHandleMiddleware;
