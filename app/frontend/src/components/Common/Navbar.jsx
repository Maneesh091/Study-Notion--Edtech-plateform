import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)



  const { totalItems } = useSelector((state) => state.cart)

  
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
     
console.log("CATEGORIES =", res.data.data)
        setSubLinks(res.data.data)
      
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
  // console.log("SUBLINKS UPDATED =", subLinks)
}, [subLinks])

// useEffect (()=>{
//   subLinks.map((i,index)=>{
//     console.log(i.name);
//   },[])
// })

  const matchRoute = (route) => {
  const result = matchPath(
    {
      path: route,
      end: route === "/",
    },
    location.pathname
  )

  // console.log("route:", route)
  // console.log("current path:", location.pathname)
  // console.log("matched:", result)

  return result
}

  return (
    <div
      className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700  bg-richblack-900
         transition-all duration-200"
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */} */
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25 text-[16px] text-semibold">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Courses" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/Courses/:catalogName")
                        ? "text-white border rounded-xl "
                        : "text-richblack-25"
                        }`}z
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 text-semibold opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded "></div>
                        {loading ? (
                          <p className="text-center text-semibold">Loading...</p>
                        ) : subLinks?.length !== 0 ? (
                          <>
                            {subLinks?.map((subLink, i) => (
                                <Link
                                 to={`/catalog/${subLink.name}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p className="text-black text-[13px]">{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? "text-blue-400"
                        : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {!token && (
            <Link to="/login">
              <button className="rounded-lg border border-richblack-700  px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {!token && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-[#00A878] px-[12px] py-[8px] text-white">
                Sign up
              </button>
            </Link>
          )}
          {token  && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
