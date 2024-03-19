import Image from 'next/image';
import React from 'react';

const CheckoutItem = ({ data, index }: { data: any; index: number }) => {
    console.log(data);
    return (
        <tr className="hover:bg-[#ffffff58] cursor-pointer">
            <td className="p-2">
                <p className="flex justify-center items-center">1</p>
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
        </tr>
    );
};

export default CheckoutItem;
