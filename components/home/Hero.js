import React from 'react'

import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { Stack } from '@mui/material';

export default function Hero({ desktop }) {
  const perspective = "none" // desktop ? "perspective(400px) rotateY(3deg) rotateX(5deg)" : "perspective(400px) rotateY(-3deg) rotateX(3deg)"

  const profilesToShow = [
    "/home/theartist.png",
    "/home/thefoodie.png",
    "/home/thehacker.png",
    "/home/theoutdoors.png",
    "/home/thebaker.png"
  ]

  const containerStyle = desktop ? {marginTop: '1rem', height: "100vh", width: '410px'} : {padding: '0.5rem', marginBottom: '4rem', width: '100%'}
  const imageShadowStyle = desktop ? {margin: '2rem' } : {}

  const buildCarouselItems = () => {
    return profilesToShow.map((profile) => {
      return (
        <Stack key={profile} style={containerStyle}>
          <ImageShadow shadowBlur={20} width={desktop ? 340 : "70%"} style={imageShadowStyle} shadowHover={desktop} src={profile} />
        </Stack>
      )
    })
  }
  return (
    <div style={{ height: desktop ? '100vh' : '100%'}}>
      <Carousel axis={desktop ? "vertical" : "horizontal"} swipeable={desktop} stopOnHover={desktop} showArrows={false} infiniteLoop={true} interval={2800} autoPlay={true} showIndicators={false} showStatus={false} showThumbs={false} centerMode={true} dynamicHeight={false} >
        {buildCarouselItems()}
      </Carousel>
    </div>

  )
}