// this is the netry point that start your server

 import dotenv from "dotenv";

 import app from "./app.js";
 import connectDB from "./db/index.js";

 
 dotenv.config();
connectDB()
.then(()=>{

   const PORT=process.env.PORT||8000;
    app.listen(PORT,()=>{
    console.log(`server is running in the ${PORT}`);
 });


 
 
})
.catch((error)=>{
   console.log("failed to connect to mongodb : ",error);
   
});


 


