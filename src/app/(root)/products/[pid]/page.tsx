'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import React, { useState } from 'react';
import SideBarRight from './_components/SideBarRight';
import ProductCarousel from './_components/ProductCarousel';
import { Button, Divider, Skeleton } from '@nextui-org/react';
import TabsPreview from './_components/TabsPreview';
import ProductItem from '../../_components/ProductItem';
import { usePathname } from 'next/navigation';
import useFetchProduct from '@/hooks/libs/useFetchProduct';
import useGetProduct from '@/hooks/libs/useGetProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '@/hooks/useAuthAxios';

const ProductDetailPage = () => {
    const authAxios = useAuthAxios();
    const [quantity, setQuantity] = useState<number>(1);
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const { data } = useFetchProduct();
    const { data: detail, isFetching } = useGetProduct(pathname.split('/')[2]);
    const { mutate } = useMutation({
        mutationFn: (data: any) => authAxios.post('/user/cart', { ...data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const handleUp = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDown = () => {
        if (quantity < 1) return;
        setQuantity((prev) => prev - 1);
    };

    const handleAddCart = () => {
        mutate({ pid: detail?.data.data.product._id, quantity, price: detail?.data.data.product.price });
    };

    return (
        <div className="wrapper my-8">
            <Breadcrumbs />

            <div className="grid grid-cols-[1fr_250px] my-10 gap-10 p-3">
                <div className="content flex flex-col">
                    {isFetching && <Skeleton className="h-[450px]" />}
                    {detail && (
                        <>
                            <div className="flex items-start gap-5">
                                <div className="w-[400px] h-[520px]">
                                    <ProductCarousel
                                        data={{
                                            capture: detail.data.data.product.capture,
                                            images: detail.data.data.product.images,
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-semibold">{detail.data.data.product.title}</h2>
                                    <p className="text-xs opacity-45 mt-1">
                                        Mã sản phẩm: <span>{detail.data.data.product._id.toUpperCase()}</span>
                                    </p>
                                    <Divider className="my-3" />
                                    <span className="text-2xl font-semibold">{detail.data.data.product.price} đ</span>
                                    <p className="my-3">{detail.data.data.product.summary}</p>
                                    <div className="flex items-center border border-white w-[max-content] rounded-md shadow-md">
                                        <span
                                            className="p-1 w-[30px] text-xl font-semibold flex justify-center items-center cursor-pointer"
                                            onClick={handleDown}
                                        >
                                            -
                                        </span>
                                        <input
                                            type="number"
                                            className="w-[100px] p-1 text-center border-none outline-none"
                                            value={quantity}
                                            onChange={(e) => setQuantity(+e.target.value)}
                                        />
                                        <span
                                            className="p-1 w-[30px] text-xl font-semibold flex justify-center items-center cursor-pointer"
                                            onClick={handleUp}
                                        >
                                            +
                                        </span>
                                    </div>
                                    <div className="mt-5 flex gap-5">
                                        {/* <Button color="secondary" variant="solid">
                                            Mua Ngay
                                        </Button> */}
                                        <Button color="danger" variant="bordered" onClick={handleAddCart}>
                                            Thêm Vào Giỏ Hàng
                                        </Button>
                                    </div>
                                    <Divider className="my-4" />
                                    <span className="text-xs opacity-55 capitalize">
                                        Danh mục: {detail.data.data.product.category.name}
                                    </span>
                                </div>
                            </div>
                            <Divider className="my-4" />
                            <TabsPreview preview={detail.data.data.product.description} />
                        </>
                    )}
                    <Divider className="my-4" />
                    <h3 className="text-xl font-bold mb-3">Sản Phẩm Tương Tự</h3>
                    <div className="w-[920px] h-[320px] overflow-x-scroll flex justify-start gap-5">
                        {data &&
                            data.data.data.products.map((product: any, index: number) => {
                                return <ProductItem key={index} width="200px" product={product} />;
                            })}
                    </div>
                </div>
                <SideBarRight />
            </div>
        </div>
    );
};

export default ProductDetailPage;
