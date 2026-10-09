const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    try {
        const { courses } = req.body
        const userId = req.user.id

        if (!Array.isArray(courses) || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one course",
            })
        }

        let totalAmount = 0

        for (const courseId of courses) {
            const course = await Course.findById(courseId)

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found",
                })
            }

            // Only published courses can be purchased
            if (course.status !== "Published") {
                return res.status(400).json({
                    success: false,
                    message: `${course.courseName} is not available for purchase`,
                })
            }

            // Check enrollment
            const alreadyEnrolled = course.studentsEnrolled.some(
                (id) => id.toString() === userId.toString()
            )

            if (alreadyEnrolled) {
                return res.status(400).json({
                    success: false,
                    message: "Student is already enrolled in this course",
                })
            }

            totalAmount += course.price
        }

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }

        const paymentResponse = await instance.orders.create(options)

        console.log(
            "RAZORPAY ORDER CREATED:",
            paymentResponse
        )

        return res.status(200).json({
            success: true,
            data: paymentResponse,
        })

    } catch (error) {
        console.log("CAPTURE PAYMENT ERROR:", error)

        return res.status(500).json({
            success: false,
            message: "Could not initiate payment",
        })
    }
}



// verify the payment
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courses,
        } = req.body


  console.log("ORDER ID =", razorpay_order_id)
  console.log("PAYMENT ID =", razorpay_payment_id)
  console.log("COURSES =", courses)
  console.log("USER ID =", req.user.id)
        const userId = req.user.id

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !Array.isArray(courses) ||
            courses.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification data is incomplete",
            })
        }

        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_SECRET
            )
            .update(body)
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            })
        }

        await enrollStudents(courses, userId)

        return res.status(200).json({
            success: true,
            message: "Payment verified and student enrolled",
        })

    } catch (error) {
        console.log("VERIFY PAYMENT ERROR:", error)

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// enroll the student in the courses
const enrollStudents = async (courses, userId,res) => {

    if (!Array.isArray(courses) || courses.length === 0) {
        throw new Error("No courses provided")
    }

    for (const courseId of courses) {

        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $addToSet: {
                    studentsEnrolled: userId,
                },
            },
            {
                new: true,
            }
        )

        if (!enrolledCourse) {
            throw new Error("Course not found")
        }

        console.log(
            "COURSE UPDATED:",
            enrolledCourse.courseName
        )

        const courseProgress = await CourseProgress.create({
            courseID: courseId,
            userId: userId,
            completedVideos: [],
        })

        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                },
            },
            {
                new: true,
            }
        )

        if (!enrolledStudent) {
            throw new Error("Student not found")
        }

        await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
                enrolledCourse.courseName,
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
        )

        console.log(
            "Enrollment email sent successfully"
        )
    }
}
// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const {
            orderId,
            paymentId,
            amount,
        } = req.body

        const userId = req.user.id

        if (
            !orderId ||
            !paymentId ||
            !amount
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all details",
            })
        }

        const enrolledStudent =
            await User.findById(userId)

        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            })
        }

        await mailSender(
            enrolledStudent.email,
            "Payment Received",
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )

        return res.status(200).json({
            success: true,
            message: "Payment success email sent",
        })

    } catch (error) {
        console.log(
            "PAYMENT EMAIL ERROR:",
            error
        )

        return res.status(500).json({
            success: false,
            message: "Could not send payment email",
        })
    }
}

// // enroll the student in the courses
// const enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)
//       // Send an email notification to the enrolled student
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// }