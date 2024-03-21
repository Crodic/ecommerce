'use client';
import useGetBills from '@/hooks/libs/useGetBills';
import { Divider } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React from 'react';

const BillPage = () => {
    const { data: session } = useSession();
    const { data: bills } = useGetBills(session?.user.id);
    const listBills = bills?.data.data.bills || [];
    return (
        <div className="wrapper my-10">
            <h3 className="text-2xl uppercase font-bold text-center">Đơn Hàng Của Tôi</h3>
            <ul className="flex flex-col gap-3 my-5">
                {listBills.map((item: any, index: number) => {
                    return (
                        <li key={index} className="w-full border-2 border-black p-3">
                            <div className="flex justify-between items-center">
                                <h5>Mã Hoá Đơn: {item._id}</h5>
                                <p>Trạng Thái: Chờ Xác Nhận</p>
                            </div>
                            <Divider className="my-2" />
                            <div>
                                <p>
                                    Tên Người Nhận: {item.user.firstname || ''} {item.user.lastname || ''}
                                </p>
                                <p>Email: {item.user.email}</p>
                                <p>Số Sản Phẩm: {item.products.length}</p>
                                <p>
                                    Địa chỉ nhận hàng:{' '}
                                    {`${item.address.address}, ${item.address.ward.name}, ${item.address.district.name}, ${item.address.province.name}`}
                                </p>
                                <p>Số điện thoại: {item.phone || '(Trống)'}</p>
                            </div>
                            <Divider className="my-2" />
                            <p className="font-semibold text-end">Tổng tiền: {item.total}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BillPage;
