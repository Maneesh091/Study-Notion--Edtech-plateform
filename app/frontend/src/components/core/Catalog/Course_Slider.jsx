import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

import Course_Card from "./Course_Card"

const Course_Slider = ({ Courses = [] }) => {
  // No courses
  if (!Courses || Courses.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-richblack-300">
          No courses available.
        </p>
      </div>
    )
  }

  /*
    Swiper loop needs enough slides.

    Example:
    Backend gives 3 courses
    A B C

    We create:
    A B C A B C A B C

    This is ONLY for displaying the slider.
    Original backend data is not changed.
  */
  let sliderCourses = [...Courses]

  while (sliderCourses.length < 8) {
    sliderCourses = [...sliderCourses, ...Courses]
  }

  return (
    <div className="relative w-full px-1">

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={700}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="!pb-10"
      >
        {sliderCourses.map((course, index) => (
          <SwiperSlide
            key={`${course?._id}-${index}`}
            className="!h-auto"
          >
            <Course_Card course={course} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}

export default Course_Slider