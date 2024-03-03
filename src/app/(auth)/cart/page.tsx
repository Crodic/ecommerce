import React from 'react';
import { Button } from '@nextui-org/react';
import CartItem from './_components/CartItem';

const CartPage = () => {
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
                    {new Array(5).fill(null).map((cart, index) => {
                        return <CartItem key={index} />;
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6} align="right" className="p-2 pr-10 text-xl">
                            Tổng tiền: <span className="font-medium">5.000.000 đ</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} align="right" className="p-2 pr-10">
                            <Button color="secondary" variant="shadow" fullWidth>
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
