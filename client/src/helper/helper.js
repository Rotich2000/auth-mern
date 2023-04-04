import axios from 'axios'
import jwt_decode from 'jwt-decode'
/** make API requests */

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** get username from token */
export const getUsername = () => {
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token);
    return decode;
}

/** authenticate function */
export const authenticate = async(username) => {
  try {
    return await axios.post('http://localhost:8080/api/authenticate', { username })
  } catch (error) {
    return {error: "Username does't exists...!"}
  }
}

/** get user details */
export const getUser = async({username}) => {
    try {
        const data = await axios.get(`http://localhost:8080/api/user/${username}`);
        return {data}
    } catch (error) {
        return {error: "Password doesn't match!!!"}
    }
}

/** login user */
export const loginUser = async(userData) => {
    try {
        const response = await axios.post("http://localhost:8080/api/login", userData);

    if(response.data){
        localStorage.setItem("token", JSON.stringify(response.data.user));
    }
    return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject({error: "check loginUser"});
    }
}

/** register user function */
export const registerUser = async(credentials) => {
    try {
        const {data: {message}, status} = await axios.post('http://localhost:8080/api/register', credentials);
        let {username, email} = credentials;

        /** send email */
        if(status === 201){
            await axios.post('http://localhost:8080/api/registerMail', {username, userEmail: email, text: message,});
        }

        return Promise.resolve(message)
    } catch (error) {
        return Promise.reject({error: "Check registerUser"})
    }
}

export const logOut = () => {
    localStorage.removeItem("token");
}

/** login function */
export const verifyPassword = async({username,password}) => {
    try {
        if(username){
            const {data} = await axios.post('/api/login', {username, password})
            return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({error: "check verifyPassword!"})
    }
}

/** update user profile section */
export const updateUser = async(response) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        let decode = jwt_decode(token);
        const {_id} = decode;
        const data = await axios.put(`http://localhost:8080/api/updateUser/${_id}`, response , {headers: { "Authorization": `Bearer ${token}`}});
        return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error: "check updateUser!"})
    }
}

/** generate OTP */
export const generateOTP = async(username) => {
    try {
        const {data: {code}, status} = await axios.get('http://localhost:8080/api/generateOTP', {params: {username}});

        //send mail with OTP
        if(status === 201){
            let {data: {data}} = await getUser({username});
            let text = `Your Password Recovery OTP is ${code}. Verify and recover password.`
            await axios.post('http://localhost:8080/api/registerMail', {username , userEmail: data.email, text, subject: "Password Recovery OTP"});
        }
        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({error})
    }
}

/** verify OTP */
export const verifyOTP = async({username, code}) => {
    try {
       const {data, status} = await axios.get('http://localhost:8080/api/verifyOTP', {params: {username, code}})
       return {data, status}
    } catch (error) {
        return Promise.reject({error: "check verifyOTP!"})
    }
}

/** reset password */
export const resetPassword = async({username, password}) => {
    try {
        const {data, status} = await axios.put('http://localhost:8080/api/resetPassword', {username, password});
        return Promise.resolve({data, status});
    } catch (error) {
        return Promise.reject({error: "check resetPassword!"});
    }
}