import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../helper/dbConnect';
import Person from '../../../models/Person';
import { apiHandler, PersonType, StatusConstants, SexConstants } from '../../../helper/';

type Data = {
  data?: PersonType[];
  success: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        /* find users with status peding and sex male */
        const person = await Person.aggregate([
          {
            $match: {
              status: StatusConstants.PENDING,
              sex: SexConstants.MALE,
            },
          },
        ]).sort({ first_name: 'asc' });
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default apiHandler(handler);
