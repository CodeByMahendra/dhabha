import mongoose from 'mongoose'

const useSchema = new mongoose.Schema({
    fullName:{type:String},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object, default:{}}
},{minimize:false},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User",useSchema)

export default User