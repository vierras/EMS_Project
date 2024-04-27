/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from '../configs/config';

const connectDb = async () => {
  await mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true
  })
    .then(() => console.log('database connected successfully!!'))
    .catch((err) => console.log('err', err));
};

export default connectDb;