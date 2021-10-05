const jwt = require('jsonwebtoken');
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, encrypt } from '../../helper';
import User from '../../models/User';
import Person from '../../models/Person';
import { apiHandler, PersonType } from '../../helper';

type Data = {
  data?: { person: PersonType; token: string } | string;
  success: boolean;
};

const { SECRET_TOKEN = 'Abc123' } = process.env;

const validate = async (username: string, password: string): Promise<PersonType | undefined> => {
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return undefined;
  }

  if (user.password === encrypt(password).toString()) {
    return await Person.findById(user.person);
  }
  return undefined;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'POST':
      try {
        const { username, password } = req.body;
        const person: PersonType | undefined = await validate(username, password);
        if (person) {
          const token = jwt.sign({ sub: person.id }, SECRET_TOKEN, { algorithm: 'HS256', expiresIn: '7d' });
          res.status(201).json({ success: true, data: { person, token } });
        } else {
          res.status(201).json({ success: false, data: 'Username or password is incorrect' });
        }
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
