'use client';

import { Button, Input } from '@nextui-org/react';
import { cn } from '@nextui-org/react';
import { useState } from 'react';

const ProfileEdit = () => {
    const [isReadOnly, setIsReadOnly] = useState(true);

    const handleEdit = () => {
        setIsReadOnly(!isReadOnly);
    };

    return (
        <form>
            <div className={cn('flex justify-between gap-4')}>
                <div className={cn('flex flex-1 flex-col gap-y-4')}>
                    <Input
                        type="text"
                        label="Firstname"
                        labelPlacement="outside"
                        placeholder=" "
                        readOnly={isReadOnly}
                    />
                    <Input
                        type="text"
                        label="Lastname"
                        labelPlacement="outside"
                        placeholder=" "
                        readOnly={isReadOnly}
                    />
                    <Input type="email" label="Email" labelPlacement="outside" placeholder=" " readOnly />
                </div>
                <div className={cn('flex flex-1 flex-col gap-y-4')}>
                    <Input type="text" label="Địa Chỉ" labelPlacement="outside" placeholder=" " readOnly={isReadOnly} />
                    <Input
                        type="text"
                        label="Số Điện Thoại"
                        labelPlacement="outside"
                        placeholder=" "
                        readOnly={isReadOnly}
                    />
                    <Input
                        type="date"
                        label="Ngày Sinh"
                        labelPlacement="outside"
                        placeholder=" "
                        readOnly={isReadOnly}
                    />
                </div>
            </div>
            <div className={cn('mt-4 flex flex-col-reverse gap-y-5', 'sm:flex-row sm:gap-x-5')}>
                <Button
                    variant={isReadOnly ? 'light' : 'ghost'}
                    color={isReadOnly ? 'secondary' : 'danger'}
                    className={cn('font-semibold')}
                    onClick={handleEdit}
                >
                    {isReadOnly ? 'Chỉnh sửa thông tin' : 'Huỷ bỏ'}
                </Button>
                <Button variant="solid" color="primary" className={cn('font-semibold text-white', 'hover:text-black')}>
                    Xác Nhận
                </Button>
            </div>
        </form>
    );
};

export default ProfileEdit;
