import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()

  const navigate = useNavigate()
  const location = useLocation()

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)

  const playerRef = useRef(null)

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  // =====================================================
  // DEBUG LOGS
  // =====================================================

  console.log("====================================")
  console.log("🔥 VIDEO DETAILS RENDERED")
  console.log("🔥 COURSE ID =", courseId)
  console.log("🔥 SECTION ID =", sectionId)
  console.log("🔥 SUBSECTION ID =", subSectionId)
  console.log("🔥 COURSE SECTION DATA =", courseSectionData)
  console.log("🔥 COURSE ENTIRE DATA =", courseEntireData)
  console.log("🔥 VIDEO DATA =", videoData)
  console.log("🔥 VIDEO URL =", videoData?.videoUrl)
  console.log("🔥 COMPLETED LECTURES =", completedLectures)
  console.log("====================================")

  // =====================================================
  // FIND CURRENT VIDEO
  // =====================================================

  useEffect(() => {
    console.log("🚀 VIDEO DETAILS useEffect RUNNING")

    console.log("➡️ courseId:", courseId)
    console.log("➡️ sectionId:", sectionId)
    console.log("➡️ subSectionId:", subSectionId)

    // Check required URL parameters
    if (!courseId || !sectionId || !subSectionId) {
      console.log("❌ REQUIRED PARAMETER MISSING")

      console.log({
        courseId,
        sectionId,
        subSectionId,
      })

      navigate("/dashboard/enrolled-courses")
      return
    }

    // Wait until course data comes from Redux
    if (!courseSectionData?.length) {
      console.log("⏳ courseSectionData is empty")
      return
    }

    console.log(
      "✅ courseSectionData received:",
      courseSectionData
    )

    // =====================================================
    // FIND SECTION
    // =====================================================

    const currentSection = courseSectionData.find(
      (section) => section._id === sectionId
    )

    console.log("🔎 CURRENT SECTION =", currentSection)

    if (!currentSection) {
      console.log("❌ SECTION NOT FOUND:", sectionId)
      return
    }

    // =====================================================
    // FIND SUBSECTION / VIDEO
    // =====================================================

    const currentVideo = currentSection.subSection?.find(
      (subSection) => subSection._id === subSectionId
    )

    console.log("🎥 CURRENT VIDEO =", currentVideo)

    if (!currentVideo) {
      console.log(
        "❌ SUBSECTION NOT FOUND:",
        subSectionId
      )
      return
    }

    // =====================================================
    // SAVE VIDEO DATA
    // =====================================================

    setVideoData(currentVideo)

    console.log(
      "✅ VIDEO DATA SET =",
      currentVideo
    )

    // =====================================================
    // COURSE THUMBNAIL
    // =====================================================

    setPreviewSource(
      courseEntireData?.thumbnail || ""
    )

    setVideoEnded(false)

  }, [
    courseId,
    sectionId,
    subSectionId,
    courseSectionData,
    courseEntireData,
    location.pathname,
    navigate,
  ])

  // =====================================================
  // VIDEO ENDED
  // =====================================================

  const handleVideoEnded = () => {
    console.log("🎬 VIDEO ENDED")

    setVideoEnded(true)

    // Later we can add:
    // dispatch(updateCompletedLectures(subSectionId))
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="flex flex-col">

      {/* =================================================
          VIDEO PLAYER
      ================================================= */}

      <div className="mx-auto w-11/12 max-w-[1000px]">

        {!videoData ? (

          // ================================
          // LOADING / PREVIEW
          // ================================

          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-richblack-800">

            {previewSource ? (
              <img
                src={previewSource}
                alt="Course Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="text-richblack-300">
                Loading video...
              </p>
            )}

          </div>

        ) : (

          // ================================
          // ACTUAL VIDEO
          // ================================

          <div className="relative aspect-video overflow-hidden rounded-md bg-black mt-2">

            <video
              ref={playerRef}
              className="h-full w-full object-contain"
              controls
              playsInline
              preload="metadata"
              onEnded={handleVideoEnded}
            >
              <source
                src={videoData?.videoUrl}
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>

          </div>

        )}

      </div>

      {/* =================================================
          VIDEO INFORMATION
      ================================================= */}

      <div className="mx-auto w-11/12 max-w-[1000px] mt-2 py-5">

        <h1 className="text-2xl font-semibold text-richblack-5">
          {videoData?.title || "Loading..."}
        </h1>

        <p className="mt-2 text-richblack-300">
          {videoData?.description || ""}
        </p>

        {/* Video completed message */}

        {videoEnded && (
          <div className="mt-4 rounded-md bg-richblack-800 px-4 py-3 text-sm text-green-100">
            ✅ Lecture completed
          </div>
        )}

      </div>

    </div>
  )
}