'use client';
import useFetchProduct from '@/hooks/libs/useFetchProduct';
import useAuthAxios from '@/hooks/useAuthAxios';
import { Avatar, Button } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';

const ProductDashboard = () => {
    const authAxios = useAuthAxios();
    const queryClient = useQueryClient();
    const { data } = useFetchProduct();
    const { push } = useRouter();
    const products = data?.data.data.products || [];
    const { mutate } = useMutation({
        mutationFn: (id: string) => authAxios.delete(`/product/${id}`),
        onSuccess: () => {
            toast.success('Xoá sản phẩm thành công');
            queryClient.invalidateQueries({ queryKey: ['product'] });
        },
    });
    return (
        <>
            <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold">Quản Lý Sản Phẩm</h5>
                <Button color="primary" onClick={() => push('/dashboard/product/add')}>
                    Thêm Sản Phẩm
                </Button>
            </div>
            <table
                className="max-w-[1000px] min-w-[1000px] mx-auto overflow-x-scroll my-5"
                cellPadding={5}
                cellSpacing={5}
                border={2}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình Ảnh</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Tồn Kho</th>
                        <th>Giảm Giá</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any, index: number) => {
                        return (
                            <tr key={index} className="border-b-1 border-black">
                                <th>{index + 1}</th>
                                <th className="flex justify-center items-center">
                                    <Avatar src={product.capture} />
                                </th>
                                <th>
                                    <b>{product.title}</b>
                                </th>
                                <th>{product.price} đ</th>
                                <th>{product.inventory}</th>
                                <th>{product.sale}</th>
                                <th>
                                    <Button isIconOnly color="danger" onClick={() => mutate(product._id)}>
                                        <HiTrash size={20} />
                                    </Button>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ProductDashboard;
