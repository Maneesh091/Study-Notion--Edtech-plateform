import React from 'react'
import {Link} from "react-router-dom"

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
<div className={`text-center text-[16px] font-semibold px-6 py-3 rounded-md font-bold 
${active ? "bg-amber-300 border-amber-50 text-black shadow-[2px_2px_rgba(255, 249, 112,0.1255, 249, 112)]" : "bg-richblack-800 shadow-[2px_2px_rgba(255,255,255,0.25)]"}
hover:scale-95 transition-all duration-200

`}>
            {children}
        </div>

    </Link>
  )
}

export default Button