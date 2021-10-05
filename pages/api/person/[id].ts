import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../helper/dbConnect';
import Person from '../../../models/Person';
import { apiHandler } from '../../../helper';

type Data = {
  data?: string[];
  success: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const {
    method,
    query: { id },
  } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        /* find by Id the data in our database */
        const person = await Person.findById(id);
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default apiHandler(handler);
