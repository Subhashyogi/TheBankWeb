const UserModel = require("../Models/UserModel");

class UserController {
  create(data) {
    return new Promise(async (res, rej) => {
      try {
        const user = new UserModel({
          firstName: data.firstName,
          lastName: data.lastName,
          pin: data.pin,
          Transictions: data?.transictions,
          TransictionsDates: data?.TransictionsDates,
          interestRate: "6.7",
        });
        user
          .save()
          .then(() => {
            // console.log(user);
            res({
              msg: "User added successfully",
              status: 1,
            });
          })
          .catch((err) => {
            console.log(err.message);
            res({
              msg: "Unable to add user",
              status: 0,
              error: err.message,
            });
          });
      } catch (err) {
        console.log(err.message);
        rej({
          msg: "Internal server error",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  read(id) {
    return new Promise(async (res, rej) => {
      try {
        let data = "";
        if (id) {
          data = await UserModel.findById(id);
        } else {
          data = await UserModel.find();
        }
        res({
          data,
          mas: "user data founded",
          status: 1,
        });
      } catch (err) {
        rej({
          data,
          mas: "user data not founded",
          status: 1,
        });
      }
    });
  }

  async transfer(sender_id, recevier_id, amount) {
    return new Promise(async (res, rej) => {
      try {
        const now = new Date().toISOString();
        const sender = await UserModel.findByIdAndUpdate(sender_id, {
          $push: {
            Transictions: -Math.abs(Number(amount)),
            TransictionsDates: now,
          },
        });
        const receiver = await UserModel.findByIdAndUpdate(recevier_id, {
          $push: {
            Transictions: Math.abs(Number(amount)),
            TransictionsDates: now,
          },
        });

        res({
          sender_data: sender,
          recevier_data: receiver,
          msg: "Transfer successful",
          status: 1,
        });
      } catch (err) {
        rej({
          message: "Unable to Transfer",
          status: 0,
        });
      }
    });
  }

  async request_loan(id, req) {
    return new Promise(async (res, rej) => {
      try {
        const { fromUserId, amount, date } = req;
        const user = await UserModel.findById(id);
        console.log(user); // this is the recipient
        const sender = await UserModel.findById(fromUserId); // this is the sender
        if (!sender || !user)
          return res({
            msg: "User not found",
            status: 0,
          });

        user.loanRequests.push({
          fromUserId: sender._id,
          fromUserName: sender.firstName,
          amount,
          date,
        });
        user.save().then((sucess) => {
          res({
            msg: "Loan request added",
            status: 1,
          });
        });
      } catch (err) {
        res({
          msg: "Failed to request loan",
          status: 0,
        });
      }
    });
  }

  async clear_loan(id, req) {
    return new Promise(async (res, rej) => {
      try {
        const { fromUserId, amount, date } = req;

        const user = await UserModel.findById(id);
        user.loanRequests = user.loanRequests.filter(
          (r) =>
            !(
              r.fromUserId === fromUserId &&
              r.amount === amount &&
              r.date === date
            )
        );

        await user.save();

        res({
          msg: "Request cleared",
          status: 1,
        });
      } catch {
        res({ msg: "Failed to clear loan request", status: 0 });
      }
    });
  }

  closeAccount(id) {
    return new Promise((res, rej) => {
      try {
        UserModel.deleteOne({ _id: id })
          .then((success) => {
            res({
              msg: "Account closed successfully",
              status: 1,
            });
          })
          .catch((error) => {
            rej({
              msg: "Unable to close",
              status: 0,
            });
          });
      } catch (error) {
        rej({
          msg: "Internal error",
          status: 0,
        });
      }
    });
  }
}

module.exports = UserController;
