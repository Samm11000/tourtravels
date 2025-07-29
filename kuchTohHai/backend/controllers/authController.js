// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "7d" });
// };

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });
//   if (!user) return res.status(401).json({ message: "Invalid username" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//   const token = createToken(user._id);

//   res
//     .cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     })
//     .json({ message: "Login successful", username: user.username, id: user._id });
// };

// export const logout = (req, res) => {
//   res.clearCookie("token").json({ message: "Logged out successfully" });
// };



// controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "7d" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid username" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = createToken(user._id);

  // Set cookie (your existing method)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax", // Less strict for development
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Also send token in response body for localStorage (new addition)
  res.json({ 
    message: "Login successful", 
    username: user.username, 
    id: user._id,
    token: token // Add this line
  });
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};
