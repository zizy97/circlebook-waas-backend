const User = require("../model/userModel");
const Customer = require("../model/customerModel");

const { Gender, Role } = require("../model/enumFiles");

//Error Handler
const handleError = (err) => {
  let valErrors = {};

  if (err.code === 11000) {
    valErrors["email"] = "Email is already used";
  }

  if (err.message === "Password Doesn't Match") {
    valErrors["password"] = "Incorrect Password";
  }

  if (err.message === "User Not Found") {
    valErrors["email"] = "Email is not registered";
  }

  if (err.message === "Email is empty") {
    valErrors["email"] = "Email is required";
  }

  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      valErrors[properties.path] = properties.message;
    });
  }

  console.log(valErrors);

  return valErrors;
};

//Users Signup function
module.exports.signup_post = async (req, res) => {
  console.log(req.body);
  try {
    const data = req.body;
    let { fname, lname, email, pNumber, gender, password, nic, role, bName, logo, socialMedia, content, relatedDocs, remarks } =
      req.body;
    var finalUser = null;
    let user = await createUser(fname,lname,email,pNumber,gender,password,nic,role);
    let user_id = user._id.toString();
    console.log(user_id);
    switch (user.role) {
      case Role.ADMIN:
        break;
      default:
        finalUser = await createCustomer(bName, logo, socialMedia, content, relatedDocs, remarks, user_id);
        break;
    }
    
    res.status(201).json("User Created");
  } catch (error) {
    let err = handleError(error);
    console.log(err)
    res.status(400).json(err);;
  }
};

//Users login Function
module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    res.status(200).json(user._id);
  } catch (error) {
    let err = handleError(error);
    res.status(400).json(err);;
  }
};

//User Update Function
module.exports.update_post = (req, res) => {
  try {
    const { fname } = req.body;
    User.findOneAndUpdate({ fname }).then((user) => {
      User.findById(user._id).then((updatedUser) => {
        console.log("Updated user > ", updatedUser);
        res.status(200).json({ updatedUser });
      });
    });
  } catch (error) {
    res.status(400).json("Not updated");
  }
};

//User Creation Function
const createUser = (fname, lname, email, pNumber, gender, password, nic, role) => {
  if (gender === "Male") {
    gender = Gender.MALE;
  } else {
    gender = Gender.FEMALE;
  }

  switch (role) {
    case "Admin":
      role = Role.ADMIN;
      break;
    default:
      role = Role.CUSTOMER;
      break;
  }

  let user = new User({
    fname,
    lname,
    email,
    pNumber,
    gender,
    password,
    nic,
    role,
  });
  return user.save();
};

//Customer Creation Function
const createCustomer = (bName, logo, socialMedia, content, relatedDocs, remarks, users_id) => {
  let customer = new Customer({
    bName, 
    logo, 
    socialMedia, 
    content, 
    relatedDocs, 
    remarks,
    users_id,
  });
  return customer.save();
};

