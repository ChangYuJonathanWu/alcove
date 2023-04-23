import React from 'react'

import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';
export default function Hero({width=220}) {
  return (
    <ImageShadow shadowBlur={25} width={width} style={{ marginBottom: "2rem", transform: "perspective(400px) rotateY(-3deg) rotateX(5deg)" }} shadowHover={true} src={"/emily.png"} />
  )
}
