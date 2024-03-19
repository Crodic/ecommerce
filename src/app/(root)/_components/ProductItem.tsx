'use client';
import { cn } from '@/libs/utils';
import { Button, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiShoppingBag } from 'react-icons/hi';

const ProductItem = ({ width, product }: { width?: string; product: any }) => {
    const { push } = useRouter();
    return (
        <div
            className={cn('h-[300px] border cursor-pointer group relative group bg-white flex-shrink-0')}
            style={{ width: width || 'auto' }}
            onClick={() => push(`/products/${product?._id}`)}
        >
            <div className="relative w-full h-[50%] overflow-hidden">
                <Link href="/">
                    <Image
                        src={product?.capture}
                        alt=""
                        fill
                        className="object-cover group-hover:scale-[1.2] transition-all duration-200"
                    />
                </Link>
            </div>
            <p className="uppercase text-xs opacity-45 text-center my-4">{product?.category.name}</p>
            <Link
                href={`/product/${product?._id}`}
                className={cn(
                    'uppercase line-clamp-1 text-center font-semibold mb-4 transition-colors duration-250',
                    'hover:text-primary'
                )}
            >
                {product?.title}
            </Link>
            <p className="font-bold text-center my-5">{product?.price} đ</p>
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
