import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
import { isDatabaseConnected } from '../config/database.js';

const router = Router();

router.use((_request, response, next) => {
  if (!isDatabaseConnected()) {
    response.status(503).json({ error: 'Database unavailable' });
    return;
  }
  next();
});

router.get('/users', async (_request, response, next) => {
  try { response.json(await User.find().sort({ username: 1 })); } catch (error) { next(error); }
});
router.post('/users', async (request, response, next) => {
  try { response.status(201).json(await User.create(request.body)); } catch (error) { next(error); }
});

router.get('/teams', async (_request, response, next) => {
  try { response.json(await Team.find().populate('members', 'username email')); } catch (error) { next(error); }
});
router.post('/teams', async (request, response, next) => {
  try { response.status(201).json(await Team.create(request.body)); } catch (error) { next(error); }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {};
    response.json(await Activity.find(filter).populate('user', 'username profile').sort({ completedAt: -1 }));
  } catch (error) { next(error); }
});
router.post('/activities', async (request, response, next) => {
  try { response.status(201).json(await Activity.create(request.body)); } catch (error) { next(error); }
});

router.get('/leaderboard', async (_request, response, next) => {
  try { response.json(await Leaderboard.find().populate('user', 'username profile').sort({ points: -1 })); } catch (error) { next(error); }
});

router.get('/workouts', async (_request, response, next) => {
  try { response.json(await Workout.find().sort({ createdAt: -1 })); } catch (error) { next(error); }
});
router.post('/workouts', async (request, response, next) => {
  try { response.status(201).json(await Workout.create(request.body)); } catch (error) { next(error); }
});

export default router;