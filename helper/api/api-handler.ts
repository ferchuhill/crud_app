import { errorHandler, jwtMiddleware } from '.';
import type { NextApiRequest, NextApiResponse } from 'next';

function apiHandler(handler: {
  (req: NextApiRequest, res: NextApiResponse<any>): Promise<void>;
  (req: NextApiRequest, res: NextApiResponse<any>): any;
}) {
  return async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler(req, res);
    } catch (err: any) {
      const error: Error = err;
      console.error(error);
      errorHandler(error, res);
    }
  };
}

export { apiHandler };
