import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true},
    image:{type:String, required:true},
    category:{type:String, required:true},
 


})

 export const Food =mongoose.models.Food || mongoose.model('Food',foodSchema)

