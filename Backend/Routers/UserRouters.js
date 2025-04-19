const { Router } = require("express");
const UserModel = require("../Models/UserModel");
const UserController = require("../Controllers/UserController");
const UserRouter = Router();

UserRouter.post("/create", (req, res) => {
  const data = req.body;
  const UserControl = new UserController().create(data);

  UserControl.then((success) => {
    res.send(success);
  }).catch((error) => {
    res.send(error);
  });
});

UserRouter.get(
  "/get-data/:id?",

  (req, res) => {
    const UserControl = new UserController();
    const userData = UserControl.read(req.params.id);
    userData
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);

UserRouter.put("/transfer/:sender_id/:recever_id/:amount", (req, res) => {
  const { sender_id } = req.params;
  const { recever_id } = req.params;
  const { amount } = req.params;
  const UserControl = new UserController();
  const transData = UserControl.transfer(sender_id, recever_id, amount);
  transData
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

UserRouter.put("/request-loan/:id", async (req, res) => {
  const { id } = req.params;
  const UserControl = new UserController();
  const user = UserControl.request_loan(id, req.body);

  user
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

UserRouter.put("/clear-loan-request/:id", async (req, res) => {
  const { id } = req.params;
  const UserControl = new UserController();
  const user = UserControl.clear_loan(id, req.body);

  user
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

UserRouter.delete("/closeAccount/:id", (req, res) => {
  const user = new UserController().closeAccount(req.params.id);
  user
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = UserRouter;
