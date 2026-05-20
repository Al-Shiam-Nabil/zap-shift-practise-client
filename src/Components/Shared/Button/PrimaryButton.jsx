import React from 'react'

export default function PrimaryButton({children,className}) {
  return (
   <button className={`${className} px-8 py-3 text-lg font-semibold rounded-full`}>
    {children}
   </button>
  )
}
