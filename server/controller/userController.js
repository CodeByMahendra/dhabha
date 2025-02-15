import User from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
 export const signup = async(req,res)=>{
    try {
        const{fullName,email,password}=req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({message:"All fields are required"})
        }


        
        const user = await User.findOne({email})
        if(!validator.isEmail(email)){
            return res.status(401).json({message:"Please enter valid email",success:false})

        }

        if(password.length<8){
            return res.status(401).json({message:"Please enter a strong password",success:false})

        }

        if(user){
            return res.status(401).json({message:"These email is already registered",success:false})

        }

        const hashedPassword = await bcrypt.hash(password,10)

      const newUser =   await User.create({fullName,email,password:hashedPassword})

        const tokenData = { userId: newUser._id}
        const token = jwt.sign(tokenData,process.env.SECRET_KEY , {expiresIn:'2d' })

        return res.status(200).cookie("token",token , { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message:"Signup successfully",
            token,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"internal server error",success:false})

    }
 }

 export const login = async(req,res)=>{
    try {


        const{email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Please enter a correct email or password",success:false})

        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        console.log(isPasswordMatch)

        if(!isPasswordMatch){
            return res.status(401).json({message:"Please enter a correct  password",success:false})

        }

        const tokenData = { userId: user._id}
        const token = jwt.sign(tokenData,process.env.SECRET_KEY , {expiresIn:'2d' })

        return res.status(200).cookie("token",token , { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message:"Login successfully",
            user,
            token,
            success:true
        })
        
    } catch (error) {
        console.log(error)
        
    }
 }


