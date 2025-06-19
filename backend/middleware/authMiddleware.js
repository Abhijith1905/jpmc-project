import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticate = async(req, res, next) => {
    try{
    if (!req.cookies || !req.cookies.jwt) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;
    const user = await User.findById(userId).select('-password');
    req.user = user;
    req.role = role;
    next();
}
catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
    }
}

const authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.role)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

