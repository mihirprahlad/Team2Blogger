import pic1 from './pic1.JPG';
import pic2 from './pic2.JPG';
import pic3 from './pic3.JPG';
import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
const images = [
    {
      src: pic1
    },
    {
      src: pic2
    },
    {
      src: pic3
    },
  ];
export default function Gallery() {
    return <Carousel images={images} style={{ height: 620, width: 520 }} isAutoPlaying={true} autoPlayInterval={3000} hasThumbnails={false} hasIndexBoard={false} hasSizeButton={false} hasMediaButton={false}/>
}