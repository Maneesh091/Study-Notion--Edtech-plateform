import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col gap-5">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className="group flex w-full flex-wrap items-center justify-between gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-5 transition-all duration-200 hover:border-richblack-500 hover:bg-richblack-750"
        >
          {/* LEFT SIDE */}
          <div className="flex flex-1 items-center gap-5">
            {/* Course Image */}
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[120px] w-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Small overlay */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
            </div>

            {/* Course Details */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-richblack-5 transition-colors group-hover:text-yellow-50">
                {course?.courseName}
              </h3>

              <p className="text-sm text-richblack-300">
                {course?.category?.name || "Course"}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-yellow-50">
                  4.5
                </span>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="text-yellow-400"
                      size={14}
                    />
                  ))}
                </div>

                <span className="text-xs text-richblack-400">
                  ({course?.ratingAndReviews?.length || 0} Ratings)
                </span>
              </div>

              {/* Instructor */}
              {course?.instructor && (
                <p className="text-xs text-richblack-400">
                  By{" "}
                  <span className="text-richblack-200">
                    {course?.instructor?.firstName}{" "}
                    {course?.instructor?.lastName}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex min-w-[130px] flex-col items-end gap-4">
            {/* Price */}
            <p className="text-2xl font-bold text-yellow-50">
              ₹{course?.price}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm font-medium text-pink-200 transition-all duration-200 hover:border-pink-500 hover:bg-pink-900/20 hover:text-pink-100"
            >
              <RiDeleteBin6Line size={17} />
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}