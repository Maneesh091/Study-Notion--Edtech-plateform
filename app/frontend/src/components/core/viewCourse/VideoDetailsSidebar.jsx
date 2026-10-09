import { useEffect, useState } from "react"
import {
  BsChevronDown,
  BsCheckCircleFill,
  BsPlayCircleFill,
} from "react-icons/bs"
import {
  IoIosArrowBack,
  IoMdClose,
} from "react-icons/io"
import { FiStar } from "react-icons/fi"

import { useSelector } from "react-redux"
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"

export default function VideoDetailsSidebar({
  setReviewModal,
}) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] =
    useState("")

  const navigate = useNavigate()
  const location = useLocation()

  const {
    sectionId,
    subSectionId,
  } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector(
    (state) => state.viewCourse
  )

  // ============================================
  // FIND CURRENT SECTION + LECTURE
  // ============================================

  useEffect(() => {
    if (!courseSectionData?.length) {
      return
    }

    const currentSectionIndex =
      courseSectionData.findIndex(
        (section) =>
          section?._id === sectionId
      )

    if (currentSectionIndex === -1) {
      return
    }

    const currentSection =
      courseSectionData[currentSectionIndex]

    const currentSubSectionIndex =
      currentSection?.subSection?.findIndex(
        (subSection) =>
          subSection?._id === subSectionId
      )

    const currentSubSection =
      currentSection?.subSection?.[
        currentSubSectionIndex
      ]

    // Open current section automatically
    setActiveStatus(
      currentSection?._id || ""
    )

    // Highlight current lecture
    setVideoBarActive(
      currentSubSection?._id || ""
    )
  }, [
    courseSectionData,
    sectionId,
    subSectionId,
    location.pathname,
  ])

  // ============================================
  // PROGRESS
  // ============================================

  const completedCount =
    completedLectures?.length || 0

  const totalLectures =
    totalNoOfLectures || 0

  const progress =
    totalLectures > 0
      ? Math.round(
          (completedCount / totalLectures) * 100
        )
      : 0

  // ============================================
  // TOGGLE SECTION
  // ============================================

  const handleSectionToggle = (sectionId) => {
    setActiveStatus((prev) =>
      prev === sectionId ? "" : sectionId
    )
  }

  // ============================================
  // OPEN LECTURE
  // ============================================

  const handleLectureClick = (
    sectionId,
    subsectionId
  ) => {
    navigate(
      `/view-course/${courseEntireData?._id}/section/${sectionId}/sub-section/${subsectionId}`
    )

    setVideoBarActive(subsectionId)

    setActiveStatus(sectionId)
  }

  return (
    <aside
      className="
        flex
        h-[calc(100vh-3.5rem)]
        w-[280px]
        max-w-[350px]
        shrink-0
        flex-col
        border-r
        border-richblack-700
        bg-richblack-800
      "
    >

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="border-b border-richblack-700 px-5 py-5">

        {/* Top row */}

        <div className="flex items-center justify-between">

          {/* Back button */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/enrolled-courses"
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-richblack-700
              text-richblack-100
              transition-all
              duration-200
              hover:bg-richblack-600
              hover:text-yellow-50
            "
            title="Back to enrolled courses"
          >
            <IoIosArrowBack size={22} />
          </button>

          {/* Review button */}

          <button
            type="button"
            onClick={() =>
              setReviewModal(true)
            }
            className="
              flex
              items-center
              gap-2
              rounded-md
              bg-yellow-50
              px-3
              py-2
              text-sm
              font-semibold
              text-richblack-900
              transition-all
              duration-200
              hover:scale-[1.02]
              hover:bg-yellow-100
            "
          >
            <FiStar size={16} />
            Review
          </button>
        </div>

        {/* Course title */}

        <div className="mt-5">

          <h2 className="line-clamp-2 text-lg font-bold text-richblack-5">
            {courseEntireData?.courseName ||
              "Course"}
          </h2>

          <p className="mt-1 text-xs text-richblack-400">
            Course content
          </p>
        </div>

        {/* ======================================
            PROGRESS
        ====================================== */}

        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs font-medium text-richblack-300">
              Your Progress
            </span>

            <span className="text-xs font-semibold text-yellow-50">
              {completedCount}/{totalLectures}
            </span>
          </div>

          {/* Progress bar */}

          <div className="h-2 w-full overflow-hidden rounded-full bg-richblack-700">

            <div
              className="h-full rounded-full bg-yellow-50 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="mt-2 text-right text-xs text-richblack-400">
            {progress}% completed
          </p>
        </div>
      </div>

      {/* ========================================
          COURSE CONTENT
      ======================================== */}

      <div className="flex-1 overflow-y-auto">

        {!courseSectionData?.length ? (
          <div className="flex h-full items-center justify-center px-5 text-center">

            <p className="text-sm text-richblack-400">
              No course content available.
            </p>

          </div>
        ) : (
          <div className="pb-5">

            {courseSectionData.map(
              (section, index) => {

                const isActive =
                  activeStatus ===
                  section?._id

                const sectionLectures =
                  section?.subSection
                    ?.length || 0

                const completedInSection =
                  section?.subSection?.filter(
                    (lecture) =>
                      completedLectures?.includes(
                        lecture?._id
                      )
                  )?.length || 0

                return (
                  <div
                    key={section?._id || index}
                    className="border-b border-richblack-700"
                  >

                    {/* =================================
                        SECTION HEADER
                    ================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        handleSectionToggle(
                          section?._id
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                        px-5
                        py-4
                        text-left
                        transition-colors
                        duration-200
                        hover:bg-richblack-700
                      "
                    >

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-semibold text-richblack-5">
                          {index + 1}.{" "}
                          {section?.sectionName}
                        </p>

                        <p className="mt-1 text-xs text-richblack-400">
                          {completedInSection}/
                          {sectionLectures} lectures
                        </p>

                      </div>

                      <BsChevronDown
                        className={`
                          shrink-0
                          text-richblack-300
                          transition-transform
                          duration-300
                          ${
                            isActive
                              ? "rotate-0"
                              : "-rotate-90"
                          }
                        `}
                      />

                    </button>

                    {/* =================================
                        SUBSECTIONS
                    ================================= */}

                    {isActive && (
                      <div className="bg-richblack-900 py-2">

                        {section?.subSection?.map(
                          (topic, topicIndex) => {

                            const isActiveLecture =
                              videoBarActive ===
                              topic?._id

                            const isCompleted =
                              completedLectures?.includes(
                                topic?._id
                              )

                            return (
                              <button
                                type="button"
                                key={
                                  topic?._id ||
                                  topicIndex
                                }
                                onClick={() =>
                                  handleLectureClick(
                                    section?._id,
                                    topic?._id
                                  )
                                }
                                className={`
                                  group
                                  flex
                                  w-full
                                  items-center
                                  gap-3
                                  px-5
                                  py-3
                                  text-left
                                  transition-all
                                  duration-200
                                  ${
                                    isActiveLecture
                                      ? "border-l-4 border-yellow-50 bg-yellow-50/10"
                                      : "border-l-4 border-transparent hover:bg-richblack-800"
                                  }
                                `}
                              >

                                {/* Lecture icon */}

                                <div className="shrink-0">

                                  {isCompleted ? (
                                    <BsCheckCircleFill
                                      className="text-caribbeangreen-300"
                                      size={17}
                                    />
                                  ) : isActiveLecture ? (
                                    <BsPlayCircleFill
                                      className="text-yellow-50"
                                      size={18}
                                    />
                                  ) : (
                                    <span
                                      className="
                                        flex
                                        h-5
                                        w-5
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-richblack-500
                                        text-[10px]
                                        text-richblack-400
                                      "
                                    >
                                      {topicIndex + 1}
                                    </span>
                                  )}

                                </div>

                                {/* Lecture title */}

                                <div className="min-w-0 flex-1">

                                  <p
                                    className={`
                                      line-clamp-2
                                      text-sm
                                      ${
                                        isActiveLecture
                                          ? "font-semibold text-yellow-50"
                                          : "text-richblack-100"
                                      }
                                    `}
                                  >
                                    {topic?.title}
                                  </p>

                                </div>

                              </button>
                            )
                          }
                        )}

                      </div>
                    )}
                  </div>
                )
              }
            )}

          </div>
        )}

      </div>

    </aside>
  )
}