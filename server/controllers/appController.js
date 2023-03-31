import UserModel from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

/** middleware to verify a user */
export async function verifyUser(req, res, next) {
  try {
    //store the userdata on a variable username, query if the request method is get
    // else body if request method is post or put
    const { username } = req.method === "GET" ? req.query : req.body;
    let exist = await UserModel.find({ username });
    if (!exist) {
      return res.status(404).send({ error: "User not found" });
    }
    next();
  } catch (error) {
    res.status(404).send({ error: "Authentication Error" });
  }
}

/**
 * POST: http://localhost:8080/api/register
 * @param : {
 "username" : "kim",
 "password": "@Kimutai",
 "email"  : "example@gmail.com",
  "firstName": "dennis",
 "lastname": "rotich",
"mobile"  : 0726942639,
 "address": "00100, Nairobi",
 "profile" : ""

}
 */

export const register = async (req, res) => {
  try {
    /** get the following values from the client */
    const { username, password, email, profile } = req.body;
    //checking for an existing user in the database
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "username already exists" });
    }
    //Hash the password for security issues if the user doesn't exists
    const hashedPassword = await bcrypt.hash(password, 10);
    //create and save the new user in our database
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      profile,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**POST: http://localhost:8080/api/login
 *@param:{
    "username": 'kim',
    'password': '12345',
 } 
 */
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not found...!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { username, _id } = user;
      const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      return res
        .status(200)
        .json({
          message: "Login Successful...!",
          user: token,
          username: user.username,
        });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Password does not match" });
    }
  } catch (error) {}
};

/** GET: http://localhost:8080/api/user/kim */
export const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) res.status(501).send({ error: "Invalid username" });
    const user = await UserModel.findOne({ username });
    /** remove password from the user
     *
     * mongoose returns unnecessary data with object so convert it into json.
     */
    const { password, ...rest } = Object.assign({}, user.toJSON());
    if (user) {
      // set cache-control headers
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      return res.status(200).json(rest);
    } else {
      res.status(404).send({ error: "Couldn't find the user!" });
    }
  } catch (error) {
    res.status(404).send({ error: "Something wrong with the code...!" });
  }
};

/** PUT: http://localhost:8080/api/updateuser
 * @param: {
"id": "<userid>"   
}

body: {
    firstName: "",
    address: "",
    profile: ""
}
 * 
 */
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userData = req.body;
  try {
    //check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    //make sure the logged in user matches the user
    if (user._id.toString() !== req.params.id) {
      return res
        .status(401)
        .send({ error: "You are not authorized to update this user" });
    }
    //update the user
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(401).send({ error: "Code problem, fix it!" });
  }
};

/** GET: http://localhost:8080/api/generateOTP */
export const generateOTP = async (req, res) => {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).json({ code: req.app.locals.OTP });
};

/** GET: http://localhost:8080/api/verifyOTP */
export const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; //reset the OTP value
    req.app.locals.resetSession = true;
    return res.status(201).json({ message: "Verification successful" });
  }
  return res.status(401).json({ message: "Invalid OTP...!" });
};

//successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/verifyOTP */
export const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).json({ message: "reset password!" });
  }
  return res.status(440).send({ error: "Session expired!" });
};

// update the password when we have a valid session
/** PUT: http://localhost:8080/api/resetPassword */
export const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );
    if (updateUser) {
      req.app.locals.resetSession = false;
      res.status(200).send({ message: "Password updated!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};
