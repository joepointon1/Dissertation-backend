import express from "express";
import { signUp, signIn, verifyToken } from "../controllers/users.js";

const router = express.Router();

router.use(function(req, res, next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
    next();
});

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verifyToken", verifyToken);

export default router;