'use client';
import { Button, Divider, Input, Radio, RadioGroup, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import CheckoutItem from './_components/CheckoutItem';
import MainLogo from '@/assets/icons/MainLogo';
import { HiCheck } from 'react-icons/hi';
import ModalAddress from './_components/ModalAddress';
import { cn } from '@/libs/utils';
import useGetUser from '@/hooks/libs/useGetUser';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '@/hooks/useAuthAxios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const PaymentPage = () => {
    const authAxios = useAuthAxios();
    const { data: session } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { replace } = useRouter();
    const [address, setAddress] = useState({
        address: '180 Cao Lỗ',
        district: { code: 1450, name: 'Quận 8' },
        province: { code: 202, name: 'Hồ Chí Minh' },
        ward: { code: '20804', name: 'Phường 4' },
    });
    const [ship, setShip] = useState(50000);
    const [phone, setPhone] = useState('');
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (data: any) => authAxios.post('/bill', { ...data }),
        onSuccess: () => {
            toast.success('Đặt Hàng Thành Công');
            queryClient.invalidateQueries({ queryKey: ['bill'] });
            replace('/bills');
        },
    });

    const { data } = useGetUser(session?.user.id as string);
    const carts: any[] = data?.data.data.user.cart;

    const handleSubmit = (data: React.SetStateAction<null | any>) => {
        setAddress(data);
    };

    const handleBuy = () => {
        const obj = {
            products: carts,
            total: carts?.reduce((total, item) => total + item.price * item.quantity, ship),
            uid: session?.user.id,
            address,
            payment: 'OFFLINE',
            phone: phone,
        };
        mutate(obj as any);
    };
    return (
        <div className="wrapper my-10">
            <div className="grid grid-cols-[1fr_300px] gap-4">
                <div>
                    <div className="checkouts w-full p-3 bg-white rounded-md">
                        <h3 className="text-xl font-bold mb-4 mt-2 flex gap-3 items-center">
                            <MainLogo />
                            Xem trước sản phẩm
                        </h3>
                        <Divider className="my-2" />
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Hình Ảnh</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Giá</th>
                                    <th>Số Lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts?.map((cart, index) => {
                                    return <CheckoutItem key={index} data={cart} index={index + 1} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-md">
                        <h3 className="text-xl font-bold mb-4 mt-2 flex gap-3 items-center">
                            <MainLogo />
                            Chọn hình thức thanh toán
                        </h3>
                        <Divider className="my-2" />
                        <RadioGroup className="mt-3" defaultValue="1">
                            <Radio value="1">Thanh toán trực tiếp khi nhận hàng</Radio>
                            <Radio value="2">Thanh toán qua VNPay</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <aside className="sidebar h-[max-content]">
                    <div className="p-3 bg-white mb-4 rounded-md">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-medium">Địa Chỉ</h4>
                            <p onClick={onOpen} className={cn('hover:text-primary', 'cursor-pointer')}>
                                Thay đổi
                            </p>
                        </div>
                        <Divider className="my-3" />
                        <div className="flex justify-start items-center gap-3 h-5">
                            <span className="text-sm font-medium">{session?.user.name || 'Người dùng'}</span>
                            <Divider orientation="vertical" />
                            <span className="text-sm font-medium">{phone}</span>
                        </div>
                        <p className="text-sm mt-3">
                            {`${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}
                        </p>
                    </div>
                    <div className="p-3 bg-white mb-4 rounded-md">
                        <h4 className="text-lg font-medium">Số điện thoại nhận hàng</h4>
                        <Divider className="my-3" />
                        <div className="flex gap-3 items-center">
                            <Input
                                size="sm"
                                placeholder="Nhập số điện thoại..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="p-3 bg-white mb-4 rounded-md">
                        <h4 className="text-lg font-medium">Mã Giảm Giá</h4>
                        <Divider className="my-3" />
                        <div className="flex gap-3 items-center">
                            <Input size="sm" placeholder="Nhập mã giảm giá..." />
                            <Button isIconOnly color="success">
                                <HiCheck size={20} />
                            </Button>
                        </div>
                    </div>
                    <div className="p-3 bg-white rounded-md">
                        <h4 className="text-lg font-medium">Đơn hàng</h4>
                        <p>1 sản phẩm</p>
                        <Divider className="my-3" />
                        <div className="flex justify-between items-center">
                            <span>Tạm tính: </span>
                            <span>{carts?.reduce((total, item) => total + item.price * item.quantity, 0)} đ</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Phí vận chuyển: </span>
                            <span>{ship} đ</span>
                        </div>
                        <Divider className="my-3" />
                        <div className="flex justify-between items-center">
                            <span>Tổng: </span>
                            <span>{carts?.reduce((total, item) => total + item.price * item.quantity, ship)} đ</span>
                        </div>
                        <p className="text-end my-4 text-xs opacity-45">
                            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                        </p>
                        <Button fullWidth color="danger" onClick={handleBuy} isDisabled={!phone}>
                            Đặt Hàng
                        </Button>
                    </div>
                </aside>
            </div>
            <ModalAddress isOpen={isOpen} onOpenChange={onOpenChange} handleSubmit={handleSubmit} />
        </div>
    );
};

export default PaymentPage;
