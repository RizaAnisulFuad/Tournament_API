import { z } from 'zod';

export const teamRegistrationSchema = z.object({
  teamName: z.string().min(4).max(15).regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Team name should only contain letters, numbers, and underscores',
  }),
  members: z.array(z.object({
    name: z.string().regex(/^[a-zA-Z ]+$/, {
      message: 'Name should only contain letters and spaces',
    }),
    phone: z.string().min(7).max(14).regex(/^[0-9]+$/, {
      message: 'Phone number should only contain numbers',
    }),
    gender: z.enum(['Man', 'Woman'], {
      errorMap: () => ({ message: 'Invalid gender' }),
    }),
  })).length(2),
});
