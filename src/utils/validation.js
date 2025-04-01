const validator= require("validator")
const validateSignupdata=(req)=>{
    const{firstName,lastName,emailId, password }=req.body;
    if(!firstName||!lastName){
        throw new Error("name is not valid");

    }
    else if(!validator.isEmail(emailId))
        throw new Error("email is not valid")
    else if(!validator.isStrongPassword(password)){
        throw new Error("Given Password is not strong please enter a new password")
    }
};
module.exports={
    validateSignupdata,
}