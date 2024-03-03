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

const ProductCarousel = () => {
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
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <Image alt="" src="https://source.unsplash.com/random/1200×500" fill />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <Image alt="" src="https://source.unsplash.com/random/1200×500" fill />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <Image alt="" src="https://source.unsplash.com/random/1200×500" fill />
                    </div>
                </SwiperSlide>
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
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <Image alt="" src="https://source.unsplash.com/random/1200×500" fill />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <Image alt="" src="https://source.unsplash.com/random/1200×500" fill />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <Image alt="" src="https://source.unsplash.com/random/1200×500" fill />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default ProductCarousel;
