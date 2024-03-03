'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/assets/styles/banner.css';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

const Banner = ({ banners }: { banners: any[] }) => {
    return (
        <div className="w-full h-[500px] border">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                loop
                navigation
                modules={[Pagination, Navigation]}
                className="banner-product"
            >
                {banners.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link
                            href={item.path}
                            className="relative w-full h-full z-10 cursor-pointer"
                            title={item.description}
                        >
                            <Image src={item.picture} alt="" fill className="object-cover" />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
