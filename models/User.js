import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },

  lastName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
    default: 'last name',
  },

  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email',
    },
  },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },

  location: {
    type: String,
    default: 'my city',
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
