'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import '@/assets/styles/product_carousel.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

const ProductCarousel = ({ data }: { data: { capture: string; images: string[] } }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={
                    {
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    } as any
                }
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {data.images &&
                    data.images.length > 0 &&
                    data.images.map((picture, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full h-full relative">
                                    <Image alt="" src={picture} fill />
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper as any}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {data.images &&
                    data.images.length > 0 &&
                    data.images.map((picture, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full h-full relative">
                                    <Image alt="" src={picture} fill />
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </>
    );
};

export default ProductCarousel;
