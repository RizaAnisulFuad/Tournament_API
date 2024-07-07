import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({
    message: 'Username is required',
  }).min(6,{
    message: 'Username should be at least 6 characters',
  }).max(15, {
    message: 'Username should be at most 15 characters',
  }),
  name: z.string().regex(/^[a-zA-Z ]+$/, {
    message: 'Name should only contain letters and spaces',}),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string({message: 'Password is required'}).min(8, {
    message: 'Password should be at least 8 characters',
  }).max(16),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  username: z.string().min(6, {
    message: 'Username should be at least 6 characters',
  }).max(15),
  password: z.string().min(8, {
    message: 'Password should be at least 8 characters',
  }).max(16),
});
