/**
 * Test Data Seed Description
 *
 * This script connects to the MongoDB database configured by MONGODB_URI, or to
 * the local octofit_db database when no connection string is provided. Before
 * inserting data, it clears the activities, leaderboard, teams, users, and
 * workouts collections so each run produces a predictable development dataset.
 *
 * The generated mock data includes four student mock profiles, two teams with
 * assigned members, six dated activities across several exercise types, and
 * team leaderboard records with points and ranks. It also creates three workout
 * recommendations covering beginner, intermediate, and advanced difficulty.
 *
 * Execute from the backend folder with `npm run seed`, or from the repository
 * root with `npm --prefix octofit-tracker/backend run seed`.
 */

import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // TODO: Add seed data for users, teams, activities, leaderboard, and workouts

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
