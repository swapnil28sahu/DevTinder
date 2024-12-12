const express= require("express");
const app =express();
app.get("/user",(req,res)=>{
    res.send({name:" swapnil",lastname:"sahu"})
});
app.post("/user",(req,res)=>{
    res.send("post call has been made for user updates")
});
app.delete("/user",(req,res)=>{
    res.send("deleted successfully")
});
app.use("/",(req,res)=>{
    res.send("hello from server 888")
});// request handler
app.use("/inside",(req,res)=>{
    res.send("hello from server inside")
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