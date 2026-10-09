const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/payments");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// console.log("🔥 PAYMENT ROUTES FILE LOADED");


// Capture Payment
router.post(
  "/capturePayment",
  auth,
  isStudent,
  capturePayment
);


// Verify Payment
router.post(
  "/verifyPayment",
  auth,
  isStudent,
  verifyPayment
);


// Payment Success Email
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);


module.exports = router;