import express, { Router, Request, Response } from "express";
import mongodb, { ObjectID, MongoClient } from "mongodb";

const router: Router = express.Router();

// Get posts
router.get("/", async (req: Request, res: Response) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

// Add post
router.post("/", async (req: Request, res: Response) => {
  const posts = await loadPostCollection();
  await posts.insertOne({ text: req.body.text, createdAt: new Date() });
  res.status(201).send();
});

// Delete post
router.delete("/:id", async (req: Request, res: Response) => {
  const posts = await loadPostCollection();
  const id: ObjectID = new ObjectID(req.params.id);
  await posts.deleteOne({ _id: id });
  res.status(201).send();
});

const loadPostCollection = async () => {
  const client: MongoClient = await MongoClient.connect(
    "mongodb+srv://app:Abc123456@vue-express-x4xnq.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  return client.db("vue-express").collection("posts");
};

export default router;
