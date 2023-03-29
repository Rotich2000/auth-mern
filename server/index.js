import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './database/connection.js'
import router from './routes/route.js'
import dotenv from 'dotenv'

dotenv.config()


const port = process.env.PORT || 8080

const app = express()

/**
 * TODO: Morgan
 * it is an http request level middleware. 
 * it is very helpful while debugging and also if you like to create log file  
 * 
 */

/** middlewares */
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by'); //less hackers know about our stack

/** HTTP GET request */
app.get('/', (req, res) => {
    res.status(201).json({greetings: 'Hello World!'})
})

/** api routes */
app.use('/api', router)

/** start server only when we have valid connection */
connectDB().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    } catch (error) {
        console.log('Cannot connect to the server!')
    }
}).catch((error) => {
    console.log(`Invalid database connection...!: ${error}`)
})
