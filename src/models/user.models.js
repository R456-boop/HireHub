import mongoose from "mongoose";
 const userSchema= new mongoose.Schema({
   fullname:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required :true,
    unique:true,
    lowercase:true
   },
   password:{
    type:String,
    required :[true,"password is required"],
    
   },
   contact:{
    type:Number,
    required:true
   },
   image:{
    type:String,
   },
   role:{
    type:String,
    enum:["student","recruiter"],
    required:true
   }
   

 },{timestamps:true});

 const User= mongoose.model("User",userSchema);
 export default User;