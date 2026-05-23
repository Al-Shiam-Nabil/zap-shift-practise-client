import React from 'react'
import LeafletMap from './LeafletMap'

export default function CoverageMap({coverageArea}) {
    
  return (
    <div className='space-y-10 mt-10'>

      <div>
        <h2 className='text-2xl font-semibold text-secondary'>We are available in 64 districts</h2>
   
   <div>
    <form  className='mt-5'>

    <div className='relative w-100'>
        <input type="text" className='bg-white rounded-full h-12 px-5 w-100 outline-none' />
        <button type="submit" className='bg-primary py-2 px-5 rounded-full h-12 absolute right-0 font-semibold cursor-pointer'>Search</button>
    </div>
    </form>
   </div>
      </div>

        <h3 className='text-xl font-semibold text-secondary'>We deliver almost all over Bangladesh</h3>
        <LeafletMap coverageArea={coverageArea}/>
    </div>
  )
}
