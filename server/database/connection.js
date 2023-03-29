import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const connect = await mongoose.connect('mongodb+srv://kim:kim@cluster0.mj1it.mongodb.net/mern-stack-auth?retryWrites=true&w=majority');
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection failed ${error}`)
        process.exit(1)
    }
}

export default connectDB;