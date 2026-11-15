import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://admin:admin123@localhost:27017";
const dbName = "hospital";
const client = new MongoClient(MONGO_URL);

let db;

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.post("/api/v1/books", (req, res,next) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json({
        message: "Book created successfully",
        data: { _id: result.insertedId, ...book },
      });
    })
    .catch(next);
});

app.get("/api/v1/books", (req, res,next) => {
  const { category } = req.query;
  const query = category ? { category } : {};

  db.collection("books")
    .find(query)
    .toArray()
    .then((books) => {
      res.status(200).json({
        message: "Books retrieved successfully",
        data: books,
      });
    })
    .catch(next);
});

app.get("/api/v1/books/:id", (req, res,next) => {
  const { id } = req.params;

  db.collection("books")
    .findOne({ _id: new ObjectId(id) })
    .then((book) => {
      if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Book retrieved successfully",
        data: book,
      });
    })
    .catch(next);
});

app.put("/api/v1/books/:id", (req, res,next) => {
  const { id } = req.params;
  const updatedBook = req.body;

  db.collection("books")
    .updateOne({ _id: new ObjectId(id) },{ $set: updatedBook })
    .then((result) => {
      if (result.matchedCount === 0) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Book updated successfully",
        data: { _id: id, ...updatedBook },
      });
    })
    .catch(next);
});

app.delete("/api/v1/books/:id", (req, res,next) => {
  const { id } = req.params;

  db.collection("books")
    .deleteOne({ _id: new ObjectId(id) })
    .then((result) => {
      if (result.deletedCount === 0) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Book deleted successfully",
        data: { _id: id },
      });
    })
    .catch(next);
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});