import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="mx-auto mb-12 grid w-[350px]  grid-cols-1 overflow-hidden rounded-2xl border border-richblack-700 shadow-[0_20px_70px_rgba(0,0,0,0.25)] xl:w-fit xl:grid-cols-4">

      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`
              relative overflow-hidden
              transition-all duration-300

              ${i === 0 && "xl:col-span-2 xl:h-[380px]"}

              ${
                card.order % 2 === 1
                  ? "h-[294px] bg-richblack-700"
                  : card.order % 2 === 0
                  ? "h-[294px] bg-richblack-800"
                  : "bg-richblack-900"
              }

              ${card.order === 3 && "xl:col-start-2"}

              ${
                card.order > 0 &&
                "hover:z-10 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
              }
            `}
          >

            {/* LEFT FEATURED SECTION */}
            {card.order < 0 ? (
              <div
                className="
                  relative flex h-full flex-col
                  justify-between
                  overflow-hidden
                  px-7 py-10
                  sm:px-10 sm:py-10
                  xl:px-12 xl:py-12 
                "
              >

                {/* Decorative glow */}
                <div
                  className="
                    pointer-events-none absolute
                    -right-20 -top-20
                    h-64 w-64
                    rounded-full
                    bg-blue-500/10
                    blur-3xl
                  "
                />

                <div
                  className="
                    pointer-events-none absolute
                    -bottom-24 -left-20
                    h-56 w-56
                    rounded-full
                    bg-cyan-400/10
                    blur-3xl
                  "
                />

                {/* Top accent */}
                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-[3px] w-10 rounded-full bg-blue-400" />

                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-richblack-300">
                      Learn Without Limits
                    </span>
                  </div>

                  {/* Heading */}
                  <div className="max-w-[620px] text-4xl font-bold leading-[1.12] text-richblack-5 sm:text-5xl xl:text-[48px]">
                    {card.heading}
                    <div className="mt-1">
                      <HighlightText text={card.highlightText} />
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="
                      mt-6
                      max-w-[560px]
                      text-base
                      font-medium
                      leading-7
                      text-richblack-300
                      sm:text-lg
                    "
                  >
                    {card.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative mt-8 flex items-center gap-5 mb-2 ">
                  <div className="w-fit bg-amber-900">
                    <CTAButton
                      active={true}
                      linkto={card.BtnLink}
                    >
                      {card.BtnText}
                    </CTAButton>
                  </div>

                  <span className="hidden text-sm font-medium text-richblack-400 sm:block">
                    Start your learning journey →
                  </span>
                </div>
              </div>
            ) : (

              /* RIGHT FEATURE CARDS */
              <div
                className="
                  group
                  flex h-full flex-col
                  justify-between
                  border-l border-t border-richblack-600/40
                  p-7
                  sm:p-8
                  xl:p-9
                "
              >

                {/* Number */}
                <div
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-richblack-500
                    bg-richblack-800
                    text-xs font-semibold
                    text-richblack-300
                    transition-all duration-300
                    group-hover:border-blue-400/50
                    group-hover:text-blue-300
                  "
                >
                  0{i}
                </div>

                <div>
                  {/* Heading */}
                  <h1
                    className="
                      max-w-[260px]
                      text-lg
                      font-semibold
                      leading-7
                      text-richblack-5
                      transition-colors duration-300
                      group-hover:text-white
                    "
                  >
                    {card.heading}
                  </h1>

                  {/* Small divider */}
                  <div
                    className="
                      my-5
                      h-px
                      w-8
                      bg-richblack-500
                      transition-all duration-300
                      group-hover:w-14
                      group-hover:bg-blue-400
                    "
                  />

                  {/* Description */}
                  <p
                    className="
                      max-w-[300px]
                      text-sm
                      font-medium
                      leading-6
                      text-richblack-400
                      transition-colors duration-300
                      group-hover:text-richblack-300
                    "
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;