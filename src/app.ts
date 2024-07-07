import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import registrationRoutes from './routes/registration';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/team', registrationRoutes);


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  })

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

