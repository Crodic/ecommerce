import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { HiTrash } from 'react-icons/hi';

const CartItem = () => {
    return (
        <tr className="hover:bg-[#ffffff58] cursor-pointer">
            <td className="p-2">
                <p className="flex justify-center items-center">1</p>
            </td>
            <td className="p-2">
                <div className="flex justify-center items-center">
                    <div className="relative w-[50px] h-[50px]">
                        <Image src="https://source.unsplash.com/random/50×50" alt="" fill />
                    </div>
                </div>
            </td>
            <td className="text-center p-2">
                <p>Cây Mai Vàng Rồng</p>
            </td>
            <td className="text-center p-2">
                <p>200.000 đ</p>
            </td>
            <td className="text-center p-2">
                <p>2</p>
            </td>
            <td className="text-center p-2">
                <Button isIconOnly color="danger">
                    <HiTrash size={20} />
                </Button>
            </td>
        </tr>
    );
};

export default CartItem;
