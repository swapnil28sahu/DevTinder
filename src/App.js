const express= require("express");
const app =express();
const {adminAuth, userAuth}=require("./Middleware/Auth")
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
app.get("/getAlldata",(req,res)=>{
   
    try {
        throw new Error("jdsjdskjdll")
        res.send("user data sent")
    } catch (error) {
        res.status(501).send("error error!")
    }
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(501).send("something went wrong!!")
    }
})
app.listen(888,()=>{
    console.log("server is listening to port 888")
})