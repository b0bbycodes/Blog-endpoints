const User = require("../models/authSchema.js");
const handleError = require('../utils/handleErrror.js')

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    // console.log( error);
    // res.json({ error });

    const errors = handleError(error);
    res.status(400).json(errors)
  }   

}

const login = async (req, res) => {
  // get info from user
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide necessary information" });
  }



  try {
      // check if user exists
  const userExist = await User.findOne({ email });

  if (!userExist) {
    // return res
    //   .status(400)
    //   .json({ success: false, msg: "Email has not been registered" });

    throw Error("incorrect email");
  }

  // passsord is correct
  const authenticated = await userExist.comparePassword(password);

  if (!authenticated) {
    // return res
    //   .status(400)
    //   .json({ success: false, msg: "Email or password is incorrect" });
      throw Error("incorrect password")
  }

  // Generate Token
  const token = userExist.generateToken();
  
    res
      .status(200)
      .json({
        success: true,
        user: { name: userExist.name, email: userExist.email },
        token
      });
      
  } catch (error) {
    // res.json({ error })
    const errors = handleError(error);
    res.status(400).json(errors)

  }
};

module.exports = { register, login };
