import React from 'react'

import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { Stack } from '@mui/material';

import TheBaker from '@/components/home/static/the_baker_rounded.png'
import TheArtist from '@/components/home/static/the_artist_rounded.png'
import TheFoodie from '@/components/home/static/the_foodie_rounded.png'
import TheHacker from '@/components/home/static/the_hacker_rounded.png'
import TheOutdoors from '@/components/home/static/the_outdoors_rounded.png'
import Avatar from '@mui/material';


export default function Hero({ desktop }) {
  const perspective = "none" // desktop ? "perspective(400px) rotateY(3deg) rotateX(5deg)" : "perspective(400px) rotateY(-3deg) rotateX(3deg)"

  const profilesToShow = [
    "/home/theartist.png",
    "/home/thefoodie.png",
    "/home/thehacker.png",
    "/home/theoutdoors.png",
    "/home/thebaker.png"
  ]

  const importedProfilesToShow = [
    TheArtist,
    TheFoodie,
    TheHacker,
    TheOutdoors,
    TheBaker
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
          <Image priority={true} style={{ borderRadius: '12px', objectFit: "contain"}} fill={true} src={profile} alt={"Alcove Profile"} />
        </div>)

      })
    }

  }

  return (
    <div style={{ marginTop: desktop? "2rem" : "0rem", height: desktop ? '100vh' : "100%", width: desktop ? "auto" : "100%"}}>
      <Carousel axis={desktop ? "vertical" : "horizontal"} swipeable={desktop} stopOnHover={desktop} showArrows={false} infiniteLoop={true} interval={2800} autoPlay={true} showIndicators={false} showStatus={false} showThumbs={false} centerMode={false} dynamicHeight={true} >
        {buildCarouselItems()}
      </Carousel>
    </div>

  )
}