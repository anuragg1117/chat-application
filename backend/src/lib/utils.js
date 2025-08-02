import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    // 7 days in milliseconds
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // used to prevent attacks as it acceptsonly http requests
    sameSite: "strict",
    secure: process.env.NODE_DEV != "development", // this is true only in production
  });
  return token;
};
