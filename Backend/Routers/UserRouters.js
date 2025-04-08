const { Router } = require("express");
const UserModel = require("../Models/UserModel");
const UserRouter = Router();

UserRouter.post("/create", (req, res) => {
  const data = req.body;
  const user = new UserModel({
    firstName: data.firstName,
    lastName: data.lastName,
    pin: data.pin,
    transiction: data?.transictions,
    TransictionsDates: data?.TransictionsDates,
    interestRate:'6.7'
  });
  user
    .save()
    .then(() => {
      console.log(user);
      res.send({
        msg: "User added successfully",
        status: 1,
      });
    })
    .catch(() => {
      res.send({
        msg: "Unable to add user",
        status: 0,
      });
    });
});

module.exports = UserRouter;
