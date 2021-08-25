import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = (req, res) => {
    console.log(req.body)
    const user = new User(req.body);

    user.save((err, user)=>{
        if (err){
            console.log(err)
            res.status(500).send({message:err});
            return
        }
        res.send({ message: "User successfully registered"});
    });
};

export const signIn = (req, res) => {
    console.log("connection")
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        
        if (!passwordIsValid) {
            return res.status(401).send({acessToken: null, message: "Invalid password." });
        }

        const token = jwt.sign({ id:user._id, isTherapist: user.isTherapist}, "top-secret", {expiresIn: 86400});

        res.status(200).send({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: token
        });
    });
};