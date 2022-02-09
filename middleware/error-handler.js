const errorHandleMiddleware = (err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'there was an error',
  //   });

  res.status(500).json({ message: 'error' });
};

export default errorHandleMiddleware;
