import React from 'react'

import logo from "../../assets/logo.png"

export default function Logo() {
  return (
    <div className='flex  items-end'>
        <img src={logo} alt="logo icon" />
        <span className='font-bold text-3xl -ms-3'>
            ZapShift
        </span>
    </div>
  )
}
