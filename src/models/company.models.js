import mongoose from "mongoose";
const companySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,

    },
    description:{
        type:String,
    


    },
    website:{
        type:String,
     
        unique:true
    },
    location:{
        type:String,
       
    },
    logo:{
        type:String,
       
    },
    userId:{// user id says who created it the comapny who created it 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      
    },

},
{timestamps:true})

const Company=mongoose.model("Company",companySchema);
export default Company
