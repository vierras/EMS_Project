import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String, required: true, unique: true, index: true, dropDups: true,
  },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  accountStatus: { type: String, required: true, default: 'Active' },
  accountCreated:{type: Date, required:true, default: Date.now},
  lastLogin: {type:Date}
});

const userModel = mongoose.model('User', userSchema);

export {userModel};