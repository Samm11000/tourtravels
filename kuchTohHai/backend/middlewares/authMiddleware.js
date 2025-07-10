import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
