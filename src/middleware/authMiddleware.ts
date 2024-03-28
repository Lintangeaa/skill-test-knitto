import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../db/models/user';

const protect = asyncHandler (async (req: any, res: any, next: any) => {
  let token;
  let jwtSecret: any = process.env.JWT_SECRET;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded: any = jwt.verify(token, jwtSecret);

      const user = await User.findByPk(decoded.id);
      req.user = user;

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req: any, res: any, next: any) => {
  if (req.user && (req.user.role === 1 || req.user.role === '1')) {
    next()
  } else {
    res.status(401)
    throw new Error(('Not authorized as an admin'))
  }
}

const client = (req: any, res: any, next: any) => {
  if (req.user && (req.user.role === 2 || req.user.role === '2')) {
    next()
  } else {
    res.status(401)
    throw new Error(('Not authorized as a client'))
  }
}

export { protect, admin, client }