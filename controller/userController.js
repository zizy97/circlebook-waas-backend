const User = require("../model/userModel");
const Customer = require("../model/customerModel");

//User find Function
module.exports.find_get = async (req, res) => {
    try {
      let {id} = req.params
      const user = await Owner.findOne({users_id : id}).populate("users_id")
      console.log(user)
      res.status(200).json(user);
    } catch (error) {
      let err = handleError(error);
      res.status(400).send(err);
    }
  };