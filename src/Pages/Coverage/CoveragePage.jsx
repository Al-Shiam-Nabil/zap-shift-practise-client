import React from 'react'
import Container from '../../Components/Shared/Container'
import CoverageMap from '../../Components/Coverage/CoverageMap'
import { useLoaderData } from 'react-router'


export default function CoveragePage() {

    const coverageArea=useLoaderData()
   
  
  return (

    <Container>
       <CoverageMap coverageArea={coverageArea}/>
    </Container>
  )
}
