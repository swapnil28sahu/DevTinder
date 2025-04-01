const mongoose = require('mongoose');
const validator =require('validator');
const { default: isEmail } = require('validator/lib/isEmail');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:4
    },
    
    lastName:{
        type:String,
        trim:true
    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("invalid mailid address")

        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
                throw new Error("Password is not strong")

        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        trim:true,
        validate(value){
            if(!["male","female","other"].includes(value))
                throw new Error("invalid entry selected for gender")

        }
    },
    about:{
        type:String,
        default:"this is about section"

    },
    photourl:{
        type:String,
        default:"https://picsum.photos/200/300"
    },
    skills:{
        type:[String]

    }
        
        
    
    


},{timestamps:true});
const userModel=mongoose.model("User",userSchema);//creating model first name of model then schema
module.exports=userModel;