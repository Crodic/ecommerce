'use client';
import useAuthAxios from '@/hooks/useAuthAxios';
import { Button } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { HiTrash } from 'react-icons/hi';

const CartItem = ({ data, index }: { data: any; index: number }) => {
    const authAxios = useAuthAxios();
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const { mutate } = useMutation({
        mutationFn: ({ id, productId }: { id: string; productId: string }) =>
            authAxios.put(`/user/cart/${id}`, { productId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', session?.user.id] });
        },
    });
    return (
        <tr className="hover:bg-[#ffffff58] cursor-pointer">
            <td className="p-2">
                <p className="flex justify-center items-center">{index}</p>
            </td>
            <td className="p-2">
                <div className="flex justify-center items-center">
                    <div className="relative w-[50px] h-[50px]">
                        <Image src={data?.product.capture} alt="" fill />
                    </div>
                </div>
            </td>
            <td className="text-center p-2">
                <p>{data?.product.title}</p>
            </td>
            <td className="text-center p-2">
                <p>{data?.product.price} đ</p>
            </td>
            <td className="text-center p-2">
                <p>{data?.quantity}</p>
            </td>
            <td className="text-center p-2">
                <Button
                    isIconOnly
                    color="danger"
                    onClick={() => mutate({ id: session?.user.id as string, productId: data?.product._id })}
                >
                    <HiTrash size={20} />
                </Button>
            </td>
        </tr>
    );
};

export default CartItem;
