import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import itemRoutes from "./routes/itemsRoutes.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Middleware hit:", req.method, req.url);
  next();
});

app.use('/back', userRoutes); // if any
app.use('/back', itemRoutes); // handles /back/items & /back/items/reviews

app.listen(5001, () => {
  console.log('🚀 Server running at http://localhost:5001');
});
