import mongoose from "mongoose";

const connectDB=async ()=>{
   try {
      const connectioninstance= await mongoose.connect(process.env.MONGODB_URL);
      console.log(`mongodb succesfuuly connected:${connectioninstance.connection.host}`);
      
   } catch (error) {
      console.log("mongodb connection is failed due to :",error);
      process.exit(1);
      //"Stop the program immediately because something went seriously wrong."

// So instead of pretending everything is fine, your server shuts down.
      
   }

};
export  default connectDB;