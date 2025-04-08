const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('../Backend/Routers/UserRouters');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/user', UserRouter)

mongoose.connect("mongodb://localhost:27017/", {
    dbName:'Bank'
}).then((sucess) => {
    console.log('connected to DB');
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
})
.catch((error) => {
    console.log('Unable to connect to db');
})


