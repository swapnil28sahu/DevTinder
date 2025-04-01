const express= require("express");
const app =express();
const connectDB=require("../config/database")
const {adminAuth, userAuth}=require("./Middleware/Auth")
const User=require("../models/user.js")
const {validateSignupdata}= require("./utils/validation.js")
const bcrypt=require("bcrypt");
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken')
// app.get("/user",(req,res)=>{
//     res.send({name:" swapnil",lastname:"sahu"})
// });
// app.post("/user",(req,res)=>{
//     res.send("post call has been made for user updates")
// });
// app.delete("/user",(req,res)=>{
//     res.send("deleted successfully")
// });
// app.use("/",(req,res)=>{
//     res.send("hello from server 888")
// });// request handler
// app.use("/inside",(req,res)=>{
//     res.send("hello from server inside")
// });

// app.use("/hi",(req,res)=>{
//     res.send("hello and welcome")
// });
// app.use((req,res)=>{
//     res.send("hello from server 888")
// });// request handler


// app.use("/user",(req,res,next)=>{
   
// next();
// res.send("hello and welcome from dummy codes") 
// },
// (req,res,next)=>{
//     next();
//     res.send("hello and welcome from dummy codes 2") 
//     console.log("next one")
// }
// );
// app.use("/admin",adminAuth)

// app.use("/user",userAuth,(req,res,next)=>{
// res.send("hello and welcome from dummy codes") 
// next();
// })

// app.use("/admin/getData",(req,res)=>
//     {
//    res.send("All data fetched") 
//     })
// app.use("/admin/DeleteData",(req,res)=>
// {
//    res.send("Deleted data") 
//  })

//app.use("/route",[rh1,rh2,rh3..])
//handling errors
// app.get("/getAlldata",(req,res)=>{
   
//     try {
//         throw new Error("jdsjdskjdll")
//         res.send("user data sent")
//     } catch (error) {
//         res.status(501).send("error error!")
//     }
// })
// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(501).send("something went wrong!!")
//     }
// })
app.use(express.json());//middleware for the below reason
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
    //console.log(req.body);// we need to add middle ware for this since its in json->after middleware it will return js obj

    const userObj={

        // firstName:"Virat",
        // lastName:"Kohli",
        // emailId:"kohli187@gmail.com",
        // password:"vtkohli@123"
    }// we can pass index also but generally we will let mongo db handle it
    
    //creating new instance of user model
    try{
        //const user =new User(req.body);this is bad way of putting data
       
        validateSignupdata(req);//validating the data
        //encrypt the password
        const{firstName,lastName,emailId,password}= req.body;
        const passwordHash= await bcrypt.hash(password,10);
        //console.log(passwordHash)
        const user=new User({
            firstName,lastName,emailId,password:passwordHash,
        });
    await user.save();// as most off mongoose func return promise we have to use async await
    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message) 
    }
});
app.get("/profile",async (req,res) => {
    try {
    const cookies=req.cookies;
    const {token}=cookies;
    if(!token)
    {
        throw new Error("Invalid Token")
    }
   
        const decodedMessage=await jwt.verify(token,"DevSwap@978");
    const {_id}=decodedMessage;
    const user= await User.findById(_id);
    // console.log(cookies);
    
    if(!user)
    {
        throw new Error("user does not exist")
    }
    res.send(user)
    }catch(err){
        res.status(400).send("ERROR:"+err.message) 
    }
    
})
app.post("/login",async (req,res) => {
    
    try {
        const{emailId,password}=req.body;
        const user=await User.findOne({ emailId: emailId})
        if(!user)
            {
                throw new Error("email id does not exist in database")
            }
            
               const isPasswordvalid=await bcrypt.compare(password,user.password);
               console.log(isPasswordvalid)
               if(isPasswordvalid)
               {
                //create a JWT Token
                const token=await jwt.sign({_id:user._id},"DevSwap@978")//we hare hiding user id and secret key we give for which we know
                console.log(token);
                res.cookie("token",token,{ httpOnly: true })
                //add the token to cookie and send res back to user

                res.send( "login successfull");
               }
               else
              {
                throw new Error("password is not correct")
              }
           
        
    } catch (err) {
        res.status(400).send("ERROR:"+err.message) 
    }
    
})
app.delete("/User",async(req,res)=>
    {
    const mailId=req.body.emailId;
    try {
        
        const users=await User.deleteOne({ emailId:mailId }); 
    if(users.deletedCount===0)
        res.status(404).send("user not deleted")
    else
    res.send("user deleted successfully");
    } catch (error) {
        res.status(400).send("something went wrong")
    }
    
})
app.patch("/User/:userId",async(req,res)=>
    {
    const userId=req.params?.userId;
    const data=req.body;
    try {
        const Allowed_UPDATES=["age","gender","about","skills"]
        const isupdateAllowed=Object.keys(data).every((k)=>Allowed_UPDATES.includes(k))
        if(!isupdateAllowed)
            throw new Error("update not allowed")
        if(data?.skills.length>9){
            throw new Error("skills cannot be more than 10")
        }
        
        const users=await User.findByIdAndUpdate({ _id:userId },data,{runValidators: true}); 
        
    if(users.length===0)
        res.status(404).send("user not updated")
    else
    res.send("user updated successfully");
    } catch (error) {
        res.status(400).send("Update Failed"+error.message)
       // console.log(error)
    }
    
})
app.put("/User",async(req,res)=>
    {
    const userId=req.body.userId;
    const data=req.body;
    try {
        
        const users=await User.findByIdAndUpdate({ _id:userId },data); 
    if(users.length===0)
        res.status(404).send("user not updated")
    else
    res.send("user updated successfully");
    } catch (error) {
        res.status(400).send("something went wrong")
    }
    
})
app.get("/User",async(req,res)=>
    {
    const mailId=req.body.emailId;
    try {
        const users= await User.find({emailId:mailId})
    if(users.length===0)
        res.status(404).send("mailId not found")
    else
    res.send(users);
    } catch (error) {
        res.status(400).send("something went wrong")
    }
    
})
app.get("/feed",async(req,res)=>
    {
    //const mailId=req.body.emailId;
    try {
        const users= await User.find({})
    if(users.length===0)
        res.status(404).send("mailId not found")
    else
    res.send(users);
    } catch (error) {
        res.status(400).send("something went wrong")
    }
    
})
connectDB().then(()=>{
    console.log("database connection established")
    app.listen(888,()=>{
        console.log("server is listening to port 888")
    });
}).catch((err)=>{
    console.log("database cannmot be connected",err)
});
