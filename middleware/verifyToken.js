import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) =>{
    console.log("wrong one")
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(401).send({message:"Token not provided"});
    }

    jwt.verify(token, "top-secret", (err,decoded) =>{
        if(err){
            return res.status(401).send({message:"User not authorized"});
        }
        req.userId = decoded.id;
        next()
    })
}

export default verifyToken