import createHttpError from "http-errors";

export const getUserController = async (req, res) => {
  const user = req.user;

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.status(200).json({
    status: 200,
    message: "Successfully found user!",
    data: user,
  });
};
