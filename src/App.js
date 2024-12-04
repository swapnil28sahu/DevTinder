const express= require("express");
const app =express();
app.use("/inside",(req,res)=>{
    res.send("hello from server inside")
});
app.use("/test",(req,res)=>{
    res.send("testing is writen in server inside")
});
app.use("/hi",(req,res)=>{
    res.send("hello and welcome")
});
app.use((req,res)=>{
    res.send("hello from server 888")
});// request handler

app.listen(888,()=>{
    console.log("server is listening to port 888")
})