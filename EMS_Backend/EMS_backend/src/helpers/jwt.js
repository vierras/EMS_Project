import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
export const sign = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });
export const verify = (payload) => jwt.verify(payload, process.env.JWT_SECRET);