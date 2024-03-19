'use client';
import React from 'react';
import { Button, Skeleton } from '@nextui-org/react';
import CartItem from './_components/CartItem';
import { useSession } from 'next-auth/react';
import useGetUser from '@/hooks/libs/useGetUser';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const { data: session } = useSession();
    const { data } = useGetUser(session?.user.id as string);
    const carts: any[] = data?.data.data.user.cart;
    const { push } = useRouter();
    return (
        <div className="wrapper my-10">
            <h2 className="text-2xl font-bold text-center mb-5">Giỏ Hàng Của Tôi</h2>
            <table className="w-full" style={{ borderSpacing: '0px 20px', borderCollapse: 'separate' }}>
                <thead>
                    <tr className="border">
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {carts?.map((cart, index) => {
                        return <CartItem key={index} data={cart} index={index + 1} />;
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6} align="right" className="p-2 pr-10 text-xl">
                            Tổng tiền:{' '}
                            <span className="font-medium">
                                {carts?.reduce((total, item) => total + item.price * item.quantity, 0) || 0} đ
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} align="right" className="p-2 pr-10">
                            <Button
                                color="secondary"
                                variant="shadow"
                                fullWidth
                                onClick={() => push('/checkout/payment')}
                            >
                                Tiến Hành Đặt Hàng
                            </Button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default CartPage;
