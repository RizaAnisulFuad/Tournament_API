import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/userModel';
import { createToken } from '../utils/jwt';
import { loginSchema, registerSchema } from '../validations/authValidation';
import { ZodError } from 'zod';


export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password } = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, name, email, password: hashedPassword });
    await newUser.save();

    const newUserWithoutPassword = newUser.toObject();
    delete newUserWithoutPassword.password;

    res.status(201).json({ message: 'User registered successfully', data: newUserWithoutPassword });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map(e => ({
        path: e.path,
        message: e.message,
      }));
      res.status(400).json({ message: 'Validation error', errors: formattedErrors });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);

    res.status(200).json({ data: {
      token: token
    }, message: 'User logged in successfully' });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map(e => ({
        path: e.path,
        message: e.message,
      }));
      res.status(400).json({ message: 'Validation error', errors: formattedErrors });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
