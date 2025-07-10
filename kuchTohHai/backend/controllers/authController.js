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

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ message: "Login successful", username: user.username, id: user._id });
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};
