/** validate username */
import toast from 'react-hot-toast'

/** Validate login page username */
export async function usernameValidate(values){

    const errors = usernameVerify({}, values);

    return errors
}

/**verify username */
const usernameVerify = (error = {}, values) => {
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Username cannot contain spaces...!');
    }
    return error;
}

/** validate password */
export async function loginValidate(values){

    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);

    return errors
}

/** validate reset password */
export async function resetPasswordValidate(values){

    const error = passwordVerify({}, values);
    if(values.password !== values.confirm_pwd){
        error.confirm_pwd = toast.error('Password and Confirm Password must match...!');
    }

    return error
}

/**validate register form */
export async function registerValidate(values){

    const errors = usernameVerify({}, values);
    passwordVerify(errors, values)
    emailVerify(errors, values)
    return errors
}

/** validate profile page */
export async function profileValidate(values){
    const errors = emailVerify({}, values)
    return errors;
}


/** *********************************************** */

/** verify password */
const passwordVerify = (error = {}, values) => {
    const specialChars =  /^[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/
    if(!values.password){
        error.password = toast.error('Password Required...!');
    }else if(values.password.includes(" ")){
        error.password = toast.error('Password cannot contain spaces...!')
    }else if(values.password.length < 8){
        error.password = toast.error('Password must be at least 8 characters long...!');
    }else if(!specialChars.test(values.password)){
        error.password = toast.error('Password must contain at least one special character...!');
    }
    return error;
}

/** validate email */
export async function emailValidate(values){
    const errors = emailVerify({}, values);
    return errors;
}


/** verify email */
const emailVerify = (error = {}, values) => {
    if(!values.email){
        error.email = toast.error('Email Required...!');
    }else if(values.email.includes(" ")){
        error.email = toast.error('Email cannot contain spaces...!');
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error('Invalid Email...!');
    }
    return error;
}
