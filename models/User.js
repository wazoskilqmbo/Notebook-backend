import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name :{
        type:String,
        required:true,
    },
    password : {
        type:String,
        required:true,
        minlength:[8,'Password should be of minimum 8 characters.']
    },
    email : {
        type:String,
        required : true,
        unique:true
    },
    date :{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('User',UserSchema);

export default User

