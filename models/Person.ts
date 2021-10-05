import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/* PersonSchema will correspond to a collection in MongoDB database. */
const PersonSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  first_name: {
    type: String,
    required: [true, 'Please provide a First Name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  last_name: {
    type: String,
    required: [true, 'Please provide a Last Name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  dni: {
    type: Number,
    required: [true, 'Please specify the DNI.'],
  },
  sex: {
    type: String,
    enum: ['Female', 'Male'],
    required: [true, 'Please specify the Sex.'],
  },
  cell_phone: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    required: [true, 'Please specify the Sex.'],
  },
});

export default mongoose.models.Person || mongoose.model('Person', PersonSchema);
