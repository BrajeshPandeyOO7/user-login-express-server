import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || '3000'
export const MONGO_URI = process.env.MONGO_URI || ''
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY