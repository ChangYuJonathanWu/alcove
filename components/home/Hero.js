import React from 'react'

import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { Stack } from '@mui/material';

import TheBaker from '@/components/home/static/thebaker_rounded.png'
import TheArtist from '@/components/home/static/theartist_rounded.png'
import TheFoodie from '@/components/home/static/thefoodie_rounded.png'
import TheHacker from '@/components/home/static/thehacker_rounded.png'
import TheOutdoors from '@/components/home/static/theoutdoors_rounded.png'
import TheGeneralist from '@/components/home/static/thegeneralist_rounded.png'
import TheReader from '@/components/home/static/thereader_rounded.png'
import Avatar from '@mui/material';


export default function Hero({ desktop }) {
  const perspective = "none" // desktop ? "perspective(400px) rotateY(3deg) rotateX(5deg)" : "perspective(400px) rotateY(-3deg) rotateX(3deg)"

  const profilesToShow = [
    "/home/web/optimized/theartist_1.png",
    "/home/web/optimized/thefoodie_1.png",
    "/home/web/optimized/thegeneralist_1.png",
    "/home/web/optimized/theoutdoors_1.png",
    "/home/web/optimized/thereader_1.png",
    "/home/web/optimized/thehacker_1.png",
    "/home/web/optimized/thebaker_1.png",
  ]

  const importedProfilesToShow = [
    TheArtist,
    TheFoodie,
    TheGeneralist,
    TheOutdoors,
    TheReader,
    TheHacker,
    TheBaker,
  ]

  const containerStyle = desktop ? { height: "100vh", width: '410px' } : { height: "520px", position: 'relative' }
  const imageShadowStyle = desktop ? { margin: '2rem' } : {}

  const buildCarouselItems = () => {
    if (desktop) {
      return profilesToShow.map((profile) => {
        return (
          <Stack key={profile} style={containerStyle}>
            <ImageShadow shadowBlur={20} width={340} style={imageShadowStyle} shadowHover={desktop} src={profile} />
          </Stack>)
      })
    } else {
      return importedProfilesToShow.map((profile, idx) => {
        return (<div key={`profile-${idx}`} style={containerStyle}>
          <Image priority={true} style={{ borderRadius: '12px', objectFit: "contain" }} fill={true} src={profile} alt={"Alcove Profile"} />
        </div>)

      })
    }

  }

  return (
    <div style={{ marginTop: desktop ? "2rem" : "0rem", height: desktop ? '100vh' : "100%", width: desktop ? "auto" : "100%" }}>
      <Carousel axis={desktop ? "vertical" : "horizontal"} swipeable={desktop} stopOnHover={desktop} showArrows={false} infiniteLoop={true} interval={3000} autoPlay={true} showIndicators={false} showStatus={false} showThumbs={false} centerMode={false} dynamicHeight={true} >
        {buildCarouselItems()}
      </Carousel>
    </div>

  )
}