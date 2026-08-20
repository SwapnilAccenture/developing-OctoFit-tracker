/**
 * Test Data Seed Script
 *
 * Description: This script populates the application's backend database with initial
 * mock data required for development and testing. It generates dummy user profiles,
 * sample team competitions, and randomized leaderboard scores.
 *
 * Execution Command: npm run seed (or ts-node seed.ts)
 */

import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya_runner', email: 'maya@mergington.edu', profile: { displayName: 'Maya Rodriguez', grade: '10' } },
      { username: 'liam_lifts', email: 'liam@mergington.edu', profile: { displayName: 'Liam Chen', grade: '11' } },
      { username: 'sofia_moves', email: 'sofia@mergington.edu', profile: { displayName: 'Sofia Patel', grade: '9' } },
      { username: 'noah_cycles', email: 'noah@mergington.edu', profile: { displayName: 'Noah Williams', grade: '12' } },
    ]);

    await Team.insertMany([
      {
        name: 'Morning Momentum',
        description: 'Start the day with a little movement.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'After School Athletics',
        description: 'A friendly team for after-school training.',
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 30, points: 45, completedAt: new Date('2026-08-18T07:30:00Z') },
      { user: users[0]._id, type: 'strength', durationMinutes: 25, points: 35, completedAt: new Date('2026-08-19T16:00:00Z') },
      { user: users[1]._id, type: 'strength', durationMinutes: 40, points: 60, completedAt: new Date('2026-08-18T16:30:00Z') },
      { user: users[2]._id, type: 'walking', durationMinutes: 35, points: 30, completedAt: new Date('2026-08-19T07:45:00Z') },
      { user: users[3]._id, type: 'cycling', durationMinutes: 45, points: 65, completedAt: new Date('2026-08-17T17:00:00Z') },
      { user: users[3]._id, type: 'running', durationMinutes: 20, points: 30, completedAt: new Date('2026-08-19T16:15:00Z') },
    ]);

    await Leaderboard.insertMany([
      { user: users[3]._id, points: 95, rank: 1 },
      { user: users[1]._id, points: 60, rank: 3 },
      { user: users[0]._id, points: 80, rank: 2 },
      { user: users[2]._id, points: 30, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Quick Cardio Boost',
        description: 'A short routine to raise your heart rate.',
        difficulty: 'beginner',
        durationMinutes: 15,
        exercises: ['Jumping jacks', 'High knees', 'Bodyweight squats'],
      },
      {
        title: 'Strength Foundations',
        description: 'Build control and confidence with full-body movements.',
        difficulty: 'intermediate',
        durationMinutes: 25,
        exercises: ['Push-ups', 'Reverse lunges', 'Plank shoulder taps'],
      },
      {
        title: 'Endurance Challenge',
        description: 'A progressive session for students ready to go further.',
        difficulty: 'advanced',
        durationMinutes: 35,
        exercises: ['Interval runs', 'Mountain climbers', 'Skater hops'],
      },
    ]);

    console.log('Seeded 4 users, 2 teams, 6 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
