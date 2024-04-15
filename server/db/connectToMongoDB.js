import mongoose from "mongoose";

 const connectToMongoDB = async ()=>{
   try {
    await mongoose.connect(process.env.MONGO_DB_URI);
   
    console.log("connect to Mongodb")
    
   } catch (error) {
      console.log(error,"Error connecting  to Mongodb")
   }
 }

 export default connectToMongoDB;