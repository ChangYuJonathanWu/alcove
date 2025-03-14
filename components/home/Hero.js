import React from 'react'

import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { Stack } from '@mui/material';

import TheBaker from '@/components/home/static/thebaker_rounded.png'
import TheArtist from '@/components/home/static/corrine_elle_artist.png'
import TheHacker from '@/components/home/static/thehacker_rounded.png'
import TheOutdoors from '@/components/home/static/theoutdoors_rounded.png'
import TheGeneralist from '@/components/home/static/thegeneralist_2.png'
import TheReader from '@/components/home/static/chris_akachi_reader.png'
import TheTraveller from '@/components/home/static/eli_santos_traveler.png'
import TheFoodie from '@/components/home/static/jessie_shu_foodie.png'
import Avatar from '@mui/material';

import Marquee from "react-fast-marquee";


export default function Hero({ desktop }) {
  const importedProfilesToShow = [
    TheArtist,
    TheGeneralist,
    TheOutdoors,
    TheFoodie,
    TheHacker,
    TheTraveller,
    TheBaker,
    TheReader,
  ]

  const mobileBoxShadow = 'rgba(0, 0, 0, 0.25) 0px 24px 25px, rgba(0, 0, 0, 0.12) 0px -12px 24px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
  const desktopBoxShadow = 'rgba(0, 0, 0, 0.25) 0px 24px 25px, rgba(0, 0, 0, 0.12) 0px -12px 24px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'


  return (
    <Marquee pauseOnHover={false} >
      {
        importedProfilesToShow.map((profile, idx) => {
          return <Image priority key={idx} height={500} style={{ margin: `${desktop ? "2.5rem" : "3.5rem"} 1rem 4rem 1rem`, borderRadius: '1rem', boxShadow: desktop ? desktopBoxShadow : mobileBoxShadow }} alt="Example profile" src={profile} />
        })
      }
    </Marquee>
  )

}