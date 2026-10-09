const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    console.log("🔥 AUTH MIDDLEWARE HIT");

    try {
        const authHeader = req.header("Authorization");

        console.log("AUTH HEADER =", authHeader);
        console.log("COOKIES =", req.cookies);
        console.log("BODY TOKEN =", req.body?.token);

        const token =
            req.cookies?.token ||
            req.body?.token ||
            (authHeader ? authHeader.replace("Bearer ", "") : null);

        console.log("TOKEN RECEIVED BY BACKEND =", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const decode = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            console.log("DECODED TOKEN =", decode);

            req.user = decode;
        } catch (err) {
            console.log("JWT VERIFY ERROR =", err.message);

            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next();

    } catch (error) {
        console.log("AUTH MIDDLEWARE ERROR =", error);

        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};

//isStudent
exports.isStudent = async (req, res, next) => {
 try{
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{    
           console.log("Printing AccountType ", req.user.accountType);
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }