import express, { Application, Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import posts from "./routes/api/posts";

const app: Application = express();

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Routes
app.use("/api/posts", posts);

// Handle prods
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req: Request, res: Response) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

// Port
const port = process.env.PORT || 5000;

// Run server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
