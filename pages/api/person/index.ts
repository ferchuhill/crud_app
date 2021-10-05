import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../helper/dbConnect';
import Person from '../../../models/Person';
import mongoose from 'mongoose';
import { apiHandler, PersonType } from '../../../helper';

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
        /* find all the data in our database */
        const person = await Person.find({});
        res.status(200).json({ success: true, data: person });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        /* create a new model in the database */
        const person = await Person.create({
          _id: new mongoose.Types.ObjectId(),
          ...req.body,
        });
        res.status(201).json({ success: true, data: person });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { _id, first_name, last_name, dni, sex, cell_phone, status }: PersonType = req.body;
        /* update a  model in the database */
        const person = await Person.findByIdAndUpdate({ _id }, { first_name, last_name, dni, sex, cell_phone, status });
        res.status(201).json({ success: true, data: person });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const { id }: { id: string } = req.body;
        /* delete in the database */
        const person = await Person.findByIdAndRemove(id);
        res.status(201).json({ success: true, data: person });
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
