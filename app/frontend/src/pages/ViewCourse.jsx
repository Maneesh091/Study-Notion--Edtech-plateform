import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

 import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
 import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

useEffect(() => {
  ;(async () => {
    try {
      const courseData = await getFullDetailsOfCourse(courseId, token)

      console.log("🔥 FULL COURSE DATA =", courseData)

      if (!courseData) {
        console.error("❌ Course data fetch failed")
        return
      }

      // getFullDetailsOfCourse is returning the actual course object
      const course = courseData

      console.log("🔥 COURSE =", course)
      console.log("🔥 COURSE CONTENT =", course?.courseContent)

      dispatch(
        setCourseSectionData(course?.courseContent || [])
      )

      dispatch(
        setEntireCourseData(course || {})
      )

      dispatch(
        setCompletedLectures(courseData?.completedVideos || [])
      )

      let lectures = 0

      course?.courseContent?.forEach((sec) => {
        lectures += sec?.subSection?.length || 0
      })

      dispatch(setTotalNoOfLectures(lectures))

      console.log("✅ Course data dispatched successfully")

    } catch (error) {
      console.error("🔥 VIEW COURSE ERROR =", error)
    }
  })()
}, [courseId, token, dispatch])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6 mt-2">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
