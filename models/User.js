import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';

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

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;
