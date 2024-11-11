'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HomeBanner() {
  const bannerData = [
    {
      id: 1,
      title: 'Welcome to Our Website',
      description: 'Discover amazing products and services',
      image: '/img/homebanner1.png',
    },
    {
      id: 2,
      title: 'Summer Sale',
      description: 'Get up to 50% off on selected items',
      image: '/img/homebanner2.webp',
    },
    {
      id: 3,
      title: 'New Arrivals',
      description: 'Check out our latest collection',
      image: '/img/homebanner3.png',
    },
    {
      id: 4,
      title: 'Free Shipping',
      description: 'On orders over ₹999',
      image: '/img/homebanner4.png',
    },
  ]

  return (
    <div className= "mt-14 md:mt-24 relative w-full h-[320px]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-full"
      >
        {bannerData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-8">
                <h2 className="text-xl md:text-4xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
                <p className="text-sm md:text-xl drop-shadow-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}