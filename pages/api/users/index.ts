import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../helper/dbConnect';
import User from '../../../models/User';
import mongoose from 'mongoose';
import { encrypt } from '../../../helper/crypto';

type Data = {
  data?: string[];
  success: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const user = await User.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { password, username, person } = req.body;

        const user = await User.create({
          _id: new mongoose.Types.ObjectId(),
          password: encrypt(password),
          username: username,
          person: person,
        }); /* create a new model in the database */
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
