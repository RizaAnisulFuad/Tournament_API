import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

interface CustomRequest extends Request {
  user?: IUser | null;
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
