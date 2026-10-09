import React from 'react'
import HighlightText from '../Homepage/HighlightText'

export const Quote = () => {
  return (
    <div>

        <div className='w-2xl text-xl'>
            <h1 className='text-amber-50'>We are passionate about revolutionizing the way we learn. Our innovative platform combines technology,  
                <HighlightText text = {"combines technology"}/>, <span className='text-orange-400 (
#fb923c)'>expertise</span> and community to create an 
                <span className='	text-amber-400 (
#fbbf24)'> unparalleled educational experience.</span>
            </h1>
        </div>
    </div>
  )
}
