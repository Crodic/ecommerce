import { END_TIME, PHONE, START_TIME } from '@/utils/var';
import React from 'react';
import { HiClock, HiPhone } from 'react-icons/hi';
import { Divider } from '@nextui-org/react';
import { FaDiscord, FaFacebook, FaMailBulk, FaYoutube } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="w-full h-[30px] bg-primary flex items-center">
            <div className="wrapper flex justify-between items-center px-2 md:px-0">
                <div className="flex items-center gap-3">
                    <HiClock color="white" size={20} />
                    <p className="text-white text-xs">
                        {START_TIME} - {END_TIME}
                    </p>
                    <Divider orientation="vertical" className="h-[20px] bg-white opacity-40" />
                    <HiPhone size={20} color="white" />
                    <p className="text-white text-xs">{PHONE}</p>
                </div>
                <div className="flex items-center gap-2">
                    <FaFacebook size={20} color="white" className="cursor-pointer" />
                    <FaDiscord size={20} color="white" className="cursor-pointer" />
                    <FaMailBulk size={20} color="white" className="cursor-pointer" />
                    <FaYoutube size={20} color="white" className="cursor-pointer" />
                </div>
            </div>
        </header>
    );
};

export default Header;
