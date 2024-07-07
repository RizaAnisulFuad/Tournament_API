import { Request, Response } from 'express';
import { ZodError } from 'zod';
import Team from '../models/teamModel';
import { teamRegistrationSchema } from '../validations/registrationValidation';

export const registerTeam = async (req: Request, res: Response) => {
  try {
    const { teamName, members } = teamRegistrationSchema.parse(req.body);

    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({ message: 'Team name already exists' });
    }

    const newTeam = new Team({ teamName, members });
    await newTeam.save();

    res.status(201).json({ message: 'Team registered successfully', data: newTeam });
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

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json({
      message: 'Teams fetched successfully',
      data: teams
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
