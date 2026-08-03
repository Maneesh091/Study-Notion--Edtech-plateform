import React from "react";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
 
const FooterLink2 = [
  {
    title: "Company",
    links: [
      { title: "About", link: "/about" },
      { title: "Careers", link: "/careers" },
      { title: "Affiliates", link: "/affiliates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Articles", link: "/articles" },
      { title: "Blog", link: "/blog" },
      { title: "Chart Sheet", link: "/chart-sheet" },
      { title: "Code challenges", link: "/code-challenges" },
      { title: "Docs", link: "/docs" },
      { title: "Projects", link: "/projects" },
      { title: "Videos", link: "/videos" },
      { title: "Workspaces", link: "/workspaces" },
    ],
  },
  {
    title: "Plans",
    links: [
      { title: "Paid memberships", link: "/paid-memberships" },
      { title: "For students", link: "/for-students" },
      { title: "Business solutions", link: "/business-solutions" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Forums", link: "/forums" },
      { title: "Chapters", link: "/chapters" },
      { title: "Events", link: "/events" },
    ],
  },
  {
    title: "Support",
    links: [{ title: "Help Center", link: "/help-center" }],
  },
];
 
const Subjects = [
  "AI",
  "Cloud Computing",
  "Code Foundations",
  "Computer Science",
  "Cybersecurity",
  "Data Analytics",
  "Data Science",
  "Data Visualization",
  "Developer Tools",
  "DevOps",
  "Game Development",
  "IT",
  "Machine Learning",
  "Math",
  "Mobile Development",
  "Web Design",
  "Web Development",
];
 
const Languages = [
  "Bash",
  "C",
  "C++",
  "C#",
  "Go",
  "HTML & CSS",
  "Java",
  "JavaScript",
  "Kotlin",
  "PHP",
  "Python",
  "R",
  "Ruby",
  "SQL",
  "Swift",
];
 
const CareerBuilding = [
  "Career paths",
  "Career services",
  "Interview prep",
  "Professional certification",
  "-",
  "Full Catalog",
  "Beta Content",
];
 
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-400">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <div className="flex flex-col lg:flex-row justify-between gap-8 py-12">
          <div className="flex flex-col lg:w-[50%]">
            <div className="flex flex-row flex-wrap gap-x-16 gap-y-10">
              <div className="w-[250px]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-richblack-900 font-bold text-sm">
                    S
                  </div>
                  <span className="text-richblack-5 font-semibold text-lg">
                    StudyNotion
                  </span>
                </div>
 
                <h3 className="text-richblack-50 font-semibold mb-3 text-sm">
                  Company
                </h3>
                <ul className="flex flex-col gap-3 text-sm">
                  {FooterLink2[0].links.map((ele, i) => (
                    <li
                      key={i}
                      className="cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {ele.title}
                    </li>
                  ))}
                </ul>
 
                <div className="flex gap-3 mt-6 text-lg">
                  <FaFacebook className="cursor-pointer hover:text-richblack-50" />
                  <FaGoogle className="cursor-pointer hover:text-richblack-50" />
                  <FaTwitter className="cursor-pointer hover:text-richblack-50" />
                  <FaYoutube className="cursor-pointer hover:text-richblack-50" />
                </div>
              </div>
 
              {FooterLink2.slice(1).map((ele, i) => (
                <div key={i} className="w-[160px]">
                  <h3 className="text-richblack-50 font-semibold mb-3 text-sm">
                    {ele.title}
                  </h3>
                  <ul className="flex flex-col gap-3 text-sm">
                    {ele.links.map((link, j) => (
                      <li
                        key={j}
                        className="cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        {link.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
 
          <div className="border-l border-richblack-700 lg:pl-8 flex flex-row flex-wrap gap-x-16 gap-y-10 lg:w-[50%]">
            <div className="w-[200px]">
              <h3 className="text-richblack-50 font-semibold mb-3 text-sm">
                Subjects
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                {Subjects.map((item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="w-[150px]">
              <h3 className="text-richblack-50 font-semibold mb-3 text-sm">
                Languages
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                {Languages.map((item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="w-[180px]">
              <h3 className="text-richblack-50 font-semibold mb-3 text-sm">
                Career building
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                {CareerBuilding.map((item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
 
        <div className="border-t border-richblack-700 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="flex gap-3">
            {BottomFooter.map((ele, i) => (
              <React.Fragment key={i}>
                <span className="cursor-pointer hover:text-richblack-50 transition-all duration-200">
                  {ele}
                </span>
                {i !== BottomFooter.length - 1 && (
                  <span className="text-richblack-500">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div>
            Made with <span className="text-pink-500">&#10084;</span> MyLabs
            &copy; 2026 Studynotion
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;