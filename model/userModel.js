const mongoose = require("mongoose");
const { Gender, Role } = require("./enumFiles");
//const { sendMail } = require("../service/sendMail");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "FirstName is required"],
  },
  lname: {
    type: String,
    required: [true, "LastName is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Email is not valid"],
    unique: true,
  },
  pNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  gender: {
    type: String,
    enum: Gender,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  nic: {
    type: String,
    required: [true, "NIC is required"],
  },
  role: {
    type: String,
    enum: Role,
    required: true,
  },
});

//Hashing Password
userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Sending the mail
userSchema.post("save", async function () {
  //sendMail(this.email, this.fname);
});

userSchema.statics.login = async function (email, password) {
  if (email != null) {
    let user = await this.findOne({ email });
    if (user) {
      let auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("Password Doesn't Match");
    }
    throw Error("User Not Found");
  }
  throw Error("Email is empty")
};

const User = mongoose.model("users", userSchema);

module.exports = User;
