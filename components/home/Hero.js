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
import TheTraveller from '@/components/home/static/thetraveller_rounded.png'
import Avatar from '@mui/material';

import Marquee from "react-fast-marquee";


export default function Hero({ desktop }) {
  const importedProfilesToShow = [
    TheArtist,
    TheOutdoors,
    TheTraveller,
    TheGeneralist,
    TheFoodie,
    TheReader,
    TheHacker,
    TheBaker,
  ]

  const containerStyle = desktop ? { height: "100vh", width: '410px' } : { height: "520px", position: 'relative' }
  const imageShadowStyle = desktop ? { paddingTop: '1rem' } : {}

  if (desktop) {
    return (
      <Marquee pauseOnHover={false} gradient={true} >
        {
          importedProfilesToShow.map((profile, idx) => {
            return <Image key={idx} height={500} style={{ margin: '0rem 1rem 1rem 1rem', borderRadius: '1rem' }} alt="Example profile" src={profile} />
          })
        }
      </Marquee>
    )
  }
  const buildCarouselItems = () => {
    return importedProfilesToShow.map((profile, idx) => {
      return (<div key={`profile-${idx}`} style={containerStyle}>
        <Image priority={true} style={{ borderRadius: '12px', objectFit: "contain" }} fill={true} src={profile} alt={"Alcove Profile"} />
      </div>)

    })
  }

  return (
    <div style={{  width: "100%" }}>
      <Carousel axis={desktop ? "vertical" : "horizontal"} swipeable={desktop} stopOnHover={desktop} showArrows={false} infiniteLoop={true} interval={3000} autoPlay={true} showIndicators={false} showStatus={false} showThumbs={false} centerMode={false} dynamicHeight={true} >
        {buildCarouselItems()}
      </Carousel>
    </div>

  )
}