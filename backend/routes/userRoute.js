import express from 'express'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'

const userRouter = express.Router();

//for login user
userRouter.post("/login", async(req, res) => {
    const user = await User.findOne({username: req.body.username});
    //if user exists
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username
            });
            return;
        }
    }
    res.status(401).send({message: "Invalid Email or Password"});
});

//for register user
userRouter.post("/register", async(req, res) => {
    const newUser  = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        username: user.username
    })
});

export default userRouter;