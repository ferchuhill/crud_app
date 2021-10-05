import { connect } from 'mongoose';
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = 'mongodb://localhost:27017/next_test',
} = process.env;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectToDatabase = () => connect(MONGO_URI);
