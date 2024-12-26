import dotenv from "dotenv";
dotenv.config();


export const allowedOrigins = process.env.ORIGINS.split(',');

export const port = process.env.PORT || 3001;