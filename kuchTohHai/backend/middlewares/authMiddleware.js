
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  // First check for cookie token (your current method)
  let token = req.cookies.token;
  
  // If no cookie token, check Authorization header (for Bearer token)
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  console.log('🔍 Auth Debug:');
  console.log('Cookie token:', !!req.cookies.token);
  console.log('Auth header:', !!req.headers.authorization);
  console.log('Token found:', !!token);
  
  if (!token) {
    return res.status(401).json({ 
      message: "No token provided",
      debug: {
        hasCookie: !!req.cookies.token,
        hasAuthHeader: !!req.headers.authorization,
        cookies: Object.keys(req.cookies || {})
      }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log('✅ User verified:', req.user);
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};