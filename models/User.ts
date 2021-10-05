import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/* UseSchema will correspond to a collection in MongoDB database. */
const UseSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: [true, 'Please provide a Username.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a Password.'],
    maxlength: [160, 'Name cannot be more than 60 characters'],
  },
  person: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});

export default mongoose.models.User || mongoose.model('User', UseSchema);
