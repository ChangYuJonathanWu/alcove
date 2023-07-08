import React from 'react'

import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
export default function Hero({width=220, desktop}) {
    const perspective = "none" // desktop ? "perspective(400px) rotateY(3deg) rotateX(5deg)" : "perspective(400px) rotateY(-3deg) rotateX(3deg)"
  return (
   <Carousel showArrows={false} showIndicators={false} showStatus={false} showThumbs={false} show>

   </Carousel>
  )
}