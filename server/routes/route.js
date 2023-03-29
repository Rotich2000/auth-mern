import {Router} from 'express';
const router = Router()

// /** import all controllers */
import {register, login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resetPassword, verifyUser } from '../controllers/appController.js'
import {sendMail} from '../controllers/mailer.js';
import Auth, {localVariables} from '../middleware/auth.js';

// /** POST methods */
router.route('/register').post(register);//register user
router.route('/registerMail').post(sendMail); //send the email
router.route('/authenticate').post(verifyUser,(req,res) => res.end());//authenticate user
router.route('/login').post(verifyUser, login);//login in app

/** GET methods */
router.route('/user/:username').get(getUser) //get the user with username
router.route('/generateOTP').get(verifyUser,localVariables,generateOTP) //generate random OTP
router.route('/verifyOTP').get(verifyUser, verifyOTP) // verify generated OTP
router.route('/createResetSession').get(createResetSession) //reset all the variables


/** PUT methods */
// used to update the user profile
router.route('/updateUser/:id').put(Auth,updateUser) 
// router.route('/updateUser/:id').put(updateUser)
router.route('/resetPassword').put(verifyUser,resetPassword) //use to reset password


export default router;