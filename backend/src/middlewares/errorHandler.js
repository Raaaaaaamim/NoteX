const errorHandler = async (
  { message = "Internal Server error", status = 500 },
  req,
  res,
  next
) => {
  res.status(status).send({
    message,
  });
};
export default errorHandler;
