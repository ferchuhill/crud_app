const jwt = require('jsonwebtoken');
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  SECRET_TOKEN = 'mongodb://localhost:27017/next_test',
} = process.env;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateToken = (userId: string) => {
  jwt.sign({ sub: userId }, SECRET_TOKEN, { algorithm: 'HS256', expiresIn: '7d' });
};
