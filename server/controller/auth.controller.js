import userModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmpassword, gender } = req.body;
    console.log(req.body);
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Password don't match" });
    }
    const User = await userModel.findOne({ userName });
    if (User) {
      return res.status(400).json({ error: "Username Already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

      const newUser = new userModel({
        fullName,
        userName,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });

      if (newUser) {
        // Generate JWT token here
        generateTokenAndSetCookie(newUser._id, res);
    
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.userName,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ error: "Invalid user data" });
      }
    }
  } catch (error) {}
};
export const login = async (req, res) => {
   try {
       const {userName,password}=req.body;
       const user  = await userModel.findOne({userName})
       const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
      
       if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid username or password"})
       }

       generateTokenAndSetCookie(user._id,res)
       res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.userName,
        profilePic: user.profilePic,
      });
   } catch (error) {
    console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
   }
};
export const logout = async  (req, res) => {
    try {
          res.cookie("jwt","",{maxAge:0})
          res.status(200).json({massage:"Logged  out successfully"})
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
};
