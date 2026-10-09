import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FiBookOpen, FiArrowUpRight } from "react-icons/fi"

import RatingStars from "../../Common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    if (course?.ratingAndReviews) {
      const count = GetAvgRating(course.ratingAndReviews)
      setAvgReviewCount(count)
    }
  }, [course])

  if (!course) return null

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group block h-full"
    >
      <div
        className="
          h-full overflow-hidden rounded-2xl
          border border-richblack-700
          bg-richblack-800
          transition-all duration-300
          hover:-translate-y-1
          hover:border-richblack-500
          hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]
        "
      >
        {/* ================= THUMBNAIL ================= */}
        <div className="relative aspect-[16/9] overflow-hidden bg-richblack-700">
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="
              h-full w-full
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          {/* Price Badge */}
          <div
            className="
              absolute bottom-3 right-3
              rounded-lg
              bg-richblack-900/90
              px-3 py-1.5
              text-sm font-semibold text-yellow-50
              backdrop-blur-sm
            "
          >
            ₹{course.price}
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex min-h-[190px] flex-col p-5">

          {/* Course Name */}
          <div className="flex items-start justify-between gap-3">
            <h3
              className="
                line-clamp-2
                text-lg font-semibold
                leading-6 text-richblack-5
                transition-colors
                group-hover:text-yellow-50
              "
            >
              {course.courseName}
            </h3>

            <FiArrowUpRight
              className="
                mt-1 shrink-0
                text-richblack-400
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
                group-hover:text-yellow-50
              "
              size={20}
            />
          </div>

          {/* Instructor */}
          <p className="mt-2 text-sm text-richblack-300">
            By{" "}
            <span className="text-richblack-100">
              {course?.instructor?.firstName}{" "}
              {course?.instructor?.lastName}
            </span>
          </p>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-semibold text-yellow-50">
              {avgReviewCount || "0.0"}
            </span>

            <RatingStars Review_Count={avgReviewCount} />

            <span className="text-xs text-richblack-400">
              ({course?.ratingAndReviews?.length || 0})
            </span>
          </div>

          {/* Description */}
          <p className="mt-3 line-clamp-2 text-sm leading-5 text-richblack-300">
            {course.courseDescription}
          </p>

          {/* Bottom */}
          <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-richblack-300">
            <FiBookOpen />
            <span>View course details</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card