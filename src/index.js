require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(cors());

//Routes
app.use("/api", routes);

//database connection
// const dbURI = process.env.MONGO_URI;
const dbURI =
  "mongodb+srv://gabrielsantana:JESUSCRE123@deliveryapp.ham4oyn.mongodb.net/?retryWrites=true&w=majority&appName=DeliveryApp";
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

//Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
