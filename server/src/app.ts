import express, { Application } from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import posts from './routes/api/posts';

const app: Application = express();

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Routes
app.use('/api/posts', posts);

// Port
const port = process.env.PORT || 5000;

// Run server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
