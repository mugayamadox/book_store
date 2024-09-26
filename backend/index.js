import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN stack");
});

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
