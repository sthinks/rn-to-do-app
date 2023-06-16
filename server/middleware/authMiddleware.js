// authMiddleware.js
import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  const token = req.headers.authorization; // Token'i 'cookie' başlığından alıyoruz
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { protect };

