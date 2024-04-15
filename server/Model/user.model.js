import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    require:true
  },
  userName:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    require:true,
    minlength:6,
  },
  gender:{
    type:String,
    require:true,

  },
  profilePic:{
    type:String,
    default:'',
  }
})

export default mongoose.model.userModel || mongoose.model('userModel',userSchema) 
 