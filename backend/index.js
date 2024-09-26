import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

//middleware to handle CORS Policy
app.use( cors({
    origin: 'http://localhost:5555',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

//define default route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN stack");
});

//define router for books
app.use('/book', booksRoute);

//connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("successfully connected to database");
    app.listen(PORT, () => {
      console.log(`listening at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
