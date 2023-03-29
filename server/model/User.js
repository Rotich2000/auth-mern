import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a unique username!'],
        unique: [true, 'Username Exists...!']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        unique: false
    },
    email: {
        type: String,
        required: [true, 'Please provide an email!'],
        unique: [true, 'Email exists...!']
    },
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: String},
    address: {type: String},
    profile: {type: String}
})

//use the plural name of the collection.
export default mongoose.model.Users || mongoose.model('User', UserSchema);