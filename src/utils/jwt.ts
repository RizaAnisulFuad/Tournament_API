import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

export const createToken = (user: IUser) => {
  return jwt.sign({ id: user._id, username: user.username,email: user.email, name:user.name }, process.env.JWT_SECRET as string, { expiresIn: '20h' });
};
