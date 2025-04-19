const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("../Backend/Routers/UserRouters");
require("dotenv").config();
const port = process.env.PORT;
const MONGOuri = process.env.MONGO_URI;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", UserRouter);

mongoose
  .connect(MONGOuri)
  .then((sucess) => {
    console.log("connected to DB");
    app.listen(port || 4000, () => {
      console.log("listening on port ", port);
    });
  })
  .catch((error) => {
    console.log("Unable to connect to db", error.message);
  });
