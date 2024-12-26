const adminAuth=(req,res,next)=>{
    const token="xyz"
    isValidtoken=token==="xyz";
    if(isValidtoken)
    {
     next();
    }
     
     res.status(401).send("Unauthorised for accesss")
     }
 const userAuth=(req,res,next)=>{
        const token="xyz"
    isValidtoken=token==="xyz";
        if(isValidtoken)
        {
         next();
        }
         
         res.status(401).send("Unauthorised for accesss")
         }
     module.exports={adminAuth,userAuth}