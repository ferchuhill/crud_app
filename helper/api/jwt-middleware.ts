const expressJwt = require('express-jwt');
import type { NextApiRequest, NextApiResponse } from 'next';

const util = require('util');
const { SECRET_TOKEN = 'TEST KEY' } = process.env;

function jwtMiddleware(req: NextApiRequest, res: NextApiResponse<any>): void {
  const middleware = expressJwt({ secret: SECRET_TOKEN, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/api/authenticate',
    ],
  });

  return util.promisify(middleware)(req, res);
}

export { jwtMiddleware };
