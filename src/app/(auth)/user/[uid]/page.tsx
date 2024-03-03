'use client';

import ModalAvatar from './_components/ModalAvatar';
import ProfileEdit from './_components/ProfileEdit';
import { Button, Divider, cn, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { HiOutlineTrash, HiPhotograph, HiUser } from 'react-icons/hi';

const SettingPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className={cn('flex-1 rounded-xl border bg-white p-4 shadow-lg wrapper my-10')}>
            <h3 className={cn('flex items-center gap-3 text-xl font-semibold')}>
                <HiUser />
                Thông tin cá nhân
            </h3>
            <div className={cn('mt-5 flex items-center gap-5')}>
                <div className={cn('relative h-[100px] w-[100px] overflow-hidden rounded-full border-2')}>
                    <Image
                        src="https://source.unsplash.com/random/1200×500"
                        alt=""
                        fill
                        className={cn('object-fill')}
                    />
                </div>
                <div className={cn('flex flex-col items-center justify-between gap-2')}>
                    <Button variant="ghost" color="primary" startContent={<HiPhotograph />} onClick={onOpen}>
                        Đổi Avatar
                    </Button>
                    <Button variant="ghost" color="danger" startContent={<HiOutlineTrash />}>
                        Xoá Avatar
                    </Button>
                </div>
                <ModalAvatar isOpen={isOpen} onClose={onClose} />
            </div>
            <div className={cn('mt-4')}>
                <ProfileEdit />
            </div>
        </div>
    );
};

export default SettingPage;
