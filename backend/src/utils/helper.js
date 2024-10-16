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
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
}
export const getHighlightedText = (text, query) => {
  const regex = new RegExp(`(.{0,30})(${query})(.{0,30})`, "i");
  const match = text.match(regex);

  if (match) {
    return {
      matched: match[2],
      context: [match[1], match[2], match[3]],
    };
  }
  return null;
};
