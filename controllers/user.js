import User from "../models/User.js";
import { genSalt } from "bcrypt";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const CreateUser =  async(req,res)=>{
    try {  
        const {name,password,email} = req.body;
        const salt = await genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        const user = await User.create({
            name:name,
            password:secPass,
            email:email
        })
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.status(201).json({ authToken });
    } catch (error) {
        res.status(500).json({error:'msg:internal server error '})
        console.log(error)
    }
}

const loginUser = async(req,res)=>{
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        res.status(201).send({authToken});
    } catch (error) {
        res.status(500).json({ error: 'msg:internal server error ' })
    }
}

const getUser = async (req,res) =>{
    try {
        let userId = req.user.id
        const user= await User.findById(userId).select("-password")
        return res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({error : "internal server error"})    
    }
}

export {
    CreateUser,
    loginUser,
    getUser
}