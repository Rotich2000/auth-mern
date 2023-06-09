import jwt from 'jsonwebtoken'

/** auth middleware */
export default async function Auth(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded._id)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({error: "Authentication Failed!"})
    }
}


export function localVariables(req,res,next){
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}