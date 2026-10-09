const express = require("express");
const app = express();

 const UserRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/course");
  const paymentRoutes = require("./routes/payments");  
  const contactRoutes = require("./routes/contact");

const database = require("./config/database");
const fileUpload = require("express-fileupload");


const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
  

const PORT = process.env.PORT || 4000

 require("dotenv").config();

// connect to the database 

database.connect();

//middleware
app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        origin:"http://localhost:5173",
        credential:true,
    }) // agr frontend and backend ak hi machine me hn toh frontend 
    // se aane wali req ki backend entertain kar sake that's why it is used 
) 

app.use(
    fileUpload({
      useTempFiles:true,
      tempFilesDir:"/tmp",
    })
) 

//cloundinary coonect 

cloudinaryConnect(); 

//routes

app.use("/api/v1/course",courseRoutes);

app.use("/api/v1/profile",profileRoutes);

 app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/auth",UserRoutes);
app.use("/api/v1/contact",contactRoutes);

//def routes
app.get("/", (req,res)=>{
  return res.json({
    success:true,
    message:'your server is up and running',
  })
}) 

app.listen(PORT,()=>{
    console.log(`your server is running at the ${PORT}`);
});