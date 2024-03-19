'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react';
import SortProduct from './_components/SortProduct';
import SideBarFilter from './_components/SideBarFilter';
import ProductItem from '../_components/ProductItem';
import { Pagination } from '@nextui-org/react';
import useFetchProduct from '@/hooks/libs/useFetchProduct';

interface IPages {
    params?: any;
    searchParams?: any;
}

const ProductsPage = ({ params, searchParams }: IPages) => {
    const { data, isFetching } = useFetchProduct();
    return (
        <div className="wrapper">
            <div className="flex justify-between items-center my-4">
                <Breadcrumbs />
                <div className="flex justify-end gap-5 items-center flex-1">
                    <p>Hiển thị 10 trong 200 kết quả</p>
                    <SortProduct />
                </div>
            </div>
            <div className="grid grid-cols-[300px_1fr] mb-10 gap-5">
                <SideBarFilter />
                <div className="border rounded-lg shadow-md p-2 h-[max-content]">
                    <div className="grid grid-cols-3 gap-3">
                        {data &&
                            data.data.data.products.map((product: any, index: number) => {
                                return <ProductItem key={index} product={product} />;
                            })}
                    </div>
                    <div className="flex justify-center items-center my-5">
                        <Pagination color="secondary" initialPage={1} total={data?.data.data.totalPage} showControls />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
