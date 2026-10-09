import { toast } from "react-hot-toast"

import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

// Load the Razorpay SDK from the CDN
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")

        script.src = src

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script)
    })
}

// Buy the Course
export async function BuyCourse(
    token,
    courses,
    user_details,
    navigate,
    dispatch
) {
    const toastId = toast.loading("Loading...")

    try {

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        if (!res) {
            toast.error(
                "Razorpay SDK failed to load"
            )
            return
        }

        console.log("order is going to create"); 


        console.log("🔥 COURSE_PAYMENT_API =", COURSE_PAYMENT_API);
console.log("🔥 courses =", courses);
console.log("🔥 token exists =", !!token);
        // Create order
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {
                courses,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )

        if (!orderResponse.data.success) {
            throw new Error(
                orderResponse.data.message
            )
        }

        console.log(
            "ORDER RESPONSE:",
            orderResponse.data
        )

        const order = orderResponse.data.data

        const options = {

            // IMPORTANT
            key: import.meta.env.VITE_RAZORPAY_KEY,

            currency: order.currency,

            amount: order.amount,

            order_id: order.id,

            name: "StudyNotion",

            description:
                "Thank you for purchasing the course",

            image: rzpLogo,

            prefill: {
                name:
                    `${user_details.firstName} ${user_details.lastName}`,

                email:
                    user_details.email,
            },

            handler: function (response) {

                console.log(
                    "RAZORPAY RESPONSE:",
                    response
                )

                verifyPayment(
                    {
                        ...response,
                        courses,
                    },
                    token,
                    navigate,
                    dispatch,
                    order.amount
                )
            },

            modal: {
                ondismiss: function () {
                    console.log(
                        "Payment popup closed"
                    )
                },
            },
        }

        const paymentObject =
            new window.Razorpay(options)

        paymentObject.open()

        paymentObject.on(
            "payment.failed",
            function (response) {

                console.log(
                    "PAYMENT FAILED:",
                    response.error
                )

                toast.error(
                    "Oops! Payment Failed."
                )
            }
        )

    } catch (error) {

        console.log(
            "PAYMENT API ERROR:",
            error
        )

        toast.error(
            error?.response?.data?.message ||
            "Could not make payment"
        )

    } finally {
        toast.dismiss(toastId)
    }
}

// Verify the Payment
async function verifyPayment(
    bodyData,
    token,
    navigate,
    dispatch,
    amount
) {
    const toastId =
        toast.loading("Verifying Payment...")
          console.log("🔥 VERIFY FUNCTION STARTED")
  console.log("🔥 VERIFY BODY =", bodyData)

    dispatch(setPaymentLoading(true))

    try {

        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization:
                    `Bearer ${token}`,
            }
        )

        console.log(
            "VERIFY PAYMENT RESPONSE:",
            response
        ) 
        
    console.log("🔥 VERIFY RESPONSE DATA =", response.data)

        if (!response.data.success) {
            throw new Error(
                response.data.message
            )
        } 
            console.log("🔥 PAYMENT VERIFIED SUCCESSFULLY")

        // Payment verified successfully
        await sendPaymentSuccessEmail(
            {
                razorpay_order_id:
                    bodyData.razorpay_order_id,

                razorpay_payment_id:
                    bodyData.razorpay_payment_id,
            },
            amount,
            token
        )

        toast.success(
            "Payment Successful. You are enrolled!"
        )

        dispatch(resetCart())

        navigate(
            "/dashboard/enrolled-courses"
        )

    } catch (error) {

        console.log(
            "PAYMENT VERIFY ERROR:",
            error
        )

        toast.error(
            error?.response?.data?.message ||
            error.message ||
            "Could not verify payment"
        )

    } finally {

        toast.dismiss(toastId)

        dispatch(
            setPaymentLoading(false)
        )
    }
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(
    response,
    amount,
    token
) {
    try {

        const result = await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId:
                    response.razorpay_order_id,

                paymentId:
                    response.razorpay_payment_id,

                amount,
            },
            {
                Authorization:
                    `Bearer ${token}`,
            }
        )

        console.log(
            "PAYMENT EMAIL RESPONSE:",
            result
        )

    } catch (error) {

        console.log(
            "PAYMENT SUCCESS EMAIL ERROR:",
            error
        )

        // Don't fail enrollment if email fails
    }
}
