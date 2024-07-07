import { Router } from 'express';
import { registerTeam, getTeams } from '../controllers/registrationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', authMiddleware, registerTeam);
router.get('/', authMiddleware, getTeams);

export default router;
