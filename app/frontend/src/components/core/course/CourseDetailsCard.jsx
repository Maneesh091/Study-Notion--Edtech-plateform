import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

import { addToCart } from "../../../slices/cartSlice";

function CourseDetailsCard({
    course,
    setConfirmationModal,
    handleBuyCourse,
}) {

    const { user } = useSelector((state) => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // -----------------------------------------
    // CHECK COURSE DATA
    // -----------------------------------------

    console.log("🔥 CourseDetailsCard received course =", course);

    if (!course) {
        console.log("❌ Course prop is undefined");

        return (
            <div className="text-richblack-5 bg-richblack-700 rounded-md p-5">
                Loading course details...
            </div>
        );
    }

    // -----------------------------------------
    // COURSE DATA
    // -----------------------------------------

    const studentsEnrolled = course?.studentsEnrolled ?? [];

    console.log(
        "🔥 Students Enrolled =",
        studentsEnrolled
    );

    console.log(
        "🔥 Current User ID =",
        user?._id
    );

    console.log(
        "🔥 Is User Enrolled =",
        user ? studentsEnrolled.includes(user._id) : false
    );

    // -----------------------------------------
    // ADD TO CART
    // -----------------------------------------

    function handleAddToCart() {

        if (user && user.accountType === "Instructor") {

            toast.error(
                "You are a instructor, you can't buy a course"
            );

            return;
        }

        if (user) {

            dispatch(addToCart(course));

            return;
        }

        // User is not logged in

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login, to add to cart",

            btn1Text: "Login",
            btn2Text: "Cancel",

            btn1Handler: () => navigate("/login"),

            btn2Handler: () => setConfirmationModal(null),
        });
    }

    // -----------------------------------------
    // SHARE COURSE
    // -----------------------------------------

    const handleShare = () => {

        copy(window.location.href);

        toast.success(
            "Link Copied to Clipboard"
        );
    };

    // -----------------------------------------
    // CHECK ENROLLMENT
    // -----------------------------------------

    const isEnrolled =
        user && studentsEnrolled.includes(user._id);

    // -----------------------------------------
    // UI
    // -----------------------------------------

    return (
    <div className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-richblack-600
        bg-richblack-800
        text-richblack-5
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        transition-all
        duration-300
        hover:border-richblack-500
    ">

        {/* ================= COURSE IMAGE ================= */}

        <div className="relative overflow-hidden">
            <img
                className="
                    h-[230px]
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    hover:scale-105
                "
                alt="course thumbnail"
                src={course.thumbnail}
            />

            {/* Image Overlay */}
            <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-richblack-900/50
                via-transparent
                to-transparent
                pointer-events-none
            " />
        </div>


        {/* ================= COURSE INFO ================= */}

        <div className="px-6 py-6">

            {/* Price */}

            <div className="mb-5">
                <p className="
                    text-3xl
                    font-bold
                    tracking-wide
                    text-richblack-5
                ">
                    Rs. {course.price}
                </p>

                <p className="
                    mt-1
                    text-sm
                    text-richblack-300
                ">
                    Full course access
                </p>
            </div>


            {/* ================= BUY NOW ================= */}

            <button
                className="
                    w-full
                    rounded-lg
                    border
                    border-richblack-500
                    bg-richblack-900
                    px-4
                    py-3
                    text-base
                    font-semibold
                    text-richblack-5

                    shadow-sm

                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:border-richblack-300
                    hover:bg-richblack-700
                    hover:shadow-lg

                    active:translate-y-0
                    active:scale-[0.98]

                    focus:outline-none
                    focus:ring-2
                    focus:ring-yellow-50
                    focus:ring-offset-2
                    focus:ring-offset-richblack-800
                "
                onClick={
                    isEnrolled
                        ? () =>
                            navigate(
                                "/dashboard/enrolled-courses"
                            )
                        : () =>
                            handleBuyCourse()
                }
            >
                {isEnrolled
                    ? "Go to course"
                    : "Buy Now"
                }
            </button>


            {/* ================= ADD TO CART ================= */}

            {!isEnrolled && (
                <button
                    className="
                        mt-3
                        w-full
                        rounded-lg
                        bg-yellow-50
                        px-4
                        py-3
                        text-base
                        font-semibold
                        text-richblack-900

                        shadow-md

                        transition-all
                        duration-200

                        hover:-translate-y-0.5
                        hover:bg-yellow-100
                        hover:shadow-lg

                        active:translate-y-0
                        active:scale-[0.98]

                        focus:outline-none
                        focus:ring-2
                        focus:ring-yellow-100
                        focus:ring-offset-2
                        focus:ring-offset-richblack-800
                    "
                    onClick={() =>
                        handleAddToCart()
                    }
                >
                    Add to cart
                </button>
            )}


            {/* ================= GUARANTEE ================= */}

            <div className="
                my-6
                border-t
                border-richblack-600
                pt-5
                text-center
            ">
                <p className="
                    text-sm
                    font-medium
                    text-richblack-100
                ">
                    30-Day Money-Back Guarantee
                </p>

                <p className="
                    mt-1
                    text-xs
                    text-richblack-400
                ">
                    Learn with confidence. Your satisfaction matters.
                </p>
            </div>


            {/* ================= SHARE ================= */}

            <div className="
                flex
                justify-center
            ">
                <button
                    className="
                        group
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        px-4
                        py-2

                        text-sm
                        font-semibold
                        text-yellow-100

                        transition-all
                        duration-200

                        hover:bg-richblack-700
                        hover:text-yellow-50
                    "
                    onClick={() =>
                        handleShare()
                    }
                >
                    <span className="
                        transition-transform
                        duration-200
                        group-hover:scale-110
                    ">
                        🔗
                    </span>

                    Share this course
                </button>
            </div>

        </div>
    </div>
)
}

export default CourseDetailsCard;