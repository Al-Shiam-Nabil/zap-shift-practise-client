import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Banner from './Banner';

export default function HeroBanner() {
  return (
    <Carousel>
                <div>
                    <Banner/>
                </div>
                <div>
                    <Banner/>
                </div>
              
            </Carousel>
  )
}


