 import express from 'express'
import dotenv from"dotenv";
import authRouts from"./routes/auth.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express(); 
dotenv.config();
const PORT = process.env.PORT || 8080; // Default port is 8080 if process.env.PORT is not defined

 app.use(express.json())
      
 app.use('/api', authRouts);
   
app.listen(PORT, () => {
   connectToMongoDB()
  console.log(`Server running on port ${PORT}`)
});
