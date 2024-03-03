'use client';
import { cn } from '@/libs/utils';
import { Button, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiShoppingBag } from 'react-icons/hi';

const ProductItem = ({ width }: { width?: string }) => {
    const { push } = useRouter();
    return (
        <div
            className={cn('h-[300px] border cursor-pointer group relative group bg-white flex-shrink-0')}
            style={{ width: width || 'auto' }}
            onClick={() => push('/products/1')}
        >
            <div className="relative w-full h-[50%] overflow-hidden">
                <Link href="/">
                    <Image
                        src="https://source.unsplash.com/random/250x150"
                        alt=""
                        fill
                        className="object-cover group-hover:scale-[1.2] transition-all duration-200"
                    />
                </Link>
            </div>
            <p className="uppercase text-xs opacity-45 text-center my-4">Cây cảnh</p>
            <Link
                href="/"
                className={cn(
                    'uppercase text-center font-semibold mb-4 transition-colors duration-250 block',
                    'hover:text-primary'
                )}
            >
                Hoa Sứ Kiểng
            </Link>
            <p className="font-bold text-center my-5">250.000 đ</p>
            <div
                className="absolute top-[50%] left-[10%] translate-y-[-50%]
            w-[80px] h-[80px] hidden group-hover:block"
            >
                <Tooltip content="Thêm vào giỏ hàng">
                    <Button size="sm" variant="faded" isIconOnly>
                        <HiShoppingBag size={30} className="text-secondary" />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default ProductItem;
