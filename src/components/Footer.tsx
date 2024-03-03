'use client';
import BigLogo from '@/assets/icons/BigLogo';
import MainLogo from '@/assets/icons/MainLogo';
import { cn } from '@/libs/utils';
import { LISTS } from '@/utils/var';
import { Button, Input } from '@nextui-org/react';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SiSnowflake } from 'react-icons/si';

const bungee = Bungee({
    subsets: ['vietnamese'],
    weight: ['400'],
    style: ['normal'],
});

const Footer = () => {
    const pathname = usePathname();
    return (
        <footer className="h-[400px] w-full flex flex-col bg-black">
            <div className="wrapper pt-10">
                <div className="grid grid-cols-[300px_1fr_320px] gap-7 text-white h-[80%]">
                    <div className="flex flex-col justify-center items-center border-r">
                        <h4 className="font-bold text-2xl uppercase">Điều hướng</h4>
                        <ul className="mt-4 pl-1">
                            {LISTS.map((menu, index) => {
                                const isActive = pathname === menu.path;
                                return (
                                    <li
                                        className={cn(
                                            'flex justify-start items-center gap-3 mb-2',
                                            isActive && 'text-primary'
                                        )}
                                        key={index}
                                    >
                                        <SiSnowflake />
                                        <Link href={menu.path}>{menu.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <div className="logo flex items-center justify-center gap-4 mb-5 w-full">
                            <BigLogo />
                            <h1 className="flex flex-col text-2xl">
                                <span className={cn(bungee.className, ' text-logo text-center')}>CAME</span>
                                <span className="capitalize text-blue-400">indoor plants</span>
                            </h1>
                        </div>
                        <p className="mb-5 text-sm">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente odio nisi deleniti
                            corporis praesentium sint veritatis, quisquam laborum, natus illo vel cum facilis
                            consequatur nam ad autem molestias explicabo similique?
                        </p>
                        <div className="flex items-center gap-3 w-full">
                            <Input placeholder="Email..." size="sm" />
                            <Button color="primary" size="lg">
                                Gửi
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center border-l pl-4">
                        <h4 className="font-bold text-2xl uppercase">Thông tin liên hệ</h4>
                        <ul className="mt-4 pl-1">
                            <li className="mb-3">
                                <span className="text-primary">A</span>: 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM
                            </li>
                            <li className="mb-3">
                                <span className="text-primary">P</span>: +84 387737 544
                            </li>
                            <li className="mb-3">
                                <span className="text-primary">E</span>: alice01422@gmail.com
                            </li>
                            <li className="mb-3">
                                <span className="text-primary">M</span>: Crodic Crystal
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bottom-content bg-[#161616] flex-1 mt-10 text-white flex justify-center items-center text-sm">
                © Bản quyền thuộc về Crodic Crystal. Thiết kế Website CAME
            </div>
        </footer>
    );
};

export default Footer;
