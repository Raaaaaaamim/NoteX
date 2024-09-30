import jwt from "jsonwebtoken";

export class CustomError extends Error {
  constructor(message, status) {
    super(message); // Call the parent class constructor
    this.status = status;
  }
}

export function createTokenAndSendCookie(id, res) {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set cookie with appropriate flags
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 15,
  });
}
