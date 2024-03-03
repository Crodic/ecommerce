'use client';

import { lists } from '@/mocks/listAvatar';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, cn } from '@nextui-org/react';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { HiOutlineCloudUpload, HiOutlineTrash } from 'react-icons/hi';

interface ModalAvatarProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalAvatar = ({ isOpen, onClose }: ModalAvatarProps) => {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleOpenFile = () => {
        inputFile.current?.click();
    };

    /** Handle Change Input Image To Get Image Review */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(null);
        const imageTypesAllowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        const file = e.target.files?.[0];
        const isAllowed = imageTypesAllowed.includes(file?.type as string);
        if (!isAllowed) {
            setError('Định dạng hình ảnh không hợp lệ. Chỉ chấp nhận hình ảnh (.png, .jpeg, .jpg, .webp)');
            setPreview(null);
            return;
        }
        const previewImage = URL.createObjectURL(file as Blob);
        setPreview(previewImage);
    };

    /** Remove Image Review */
    const handleCancelPreview = () => {
        if (error) setError(null);
        setPreview(null);
        if (inputFile.current) inputFile.current.value = '';
    };

    return (
        <Modal size="lg" isOpen={isOpen} onClose={onClose} style={{ zIndex: 500 }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={cn('flex flex-col gap-1')}>Cập Nhật Avatar</ModalHeader>
                        <ModalBody>
                            {/* Tab Content */}
                            <Tabs aria-label="Options">
                                <Tab key="memoji" title="Memoji">
                                    <div className={cn('grid grid-cols-5 gap-3')}>
                                        {lists.map((img, index) => (
                                            <Image
                                                src={img}
                                                alt=""
                                                key={index}
                                                width={100}
                                                height={100}
                                                className={cn('cursor-pointer rounded-full border-2 object-cover')}
                                            />
                                        ))}
                                    </div>
                                </Tab>
                                <Tab key="photo" title="Photo">
                                    {error && <p className={cn('mb-4 text-xs text-danger')}>{error}</p>}
                                    <div
                                        className={cn(
                                            'bg-main flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border-4 border-dashed'
                                        )}
                                    >
                                        <input
                                            type="file"
                                            className={cn('hidden')}
                                            ref={inputFile}
                                            onChange={handleChange}
                                        />
                                        {preview ? (
                                            <div
                                                className={cn(
                                                    'group relative h-[150px] w-[150px] cursor-pointer overflow-hidden rounded-full border-2'
                                                )}
                                            >
                                                <Image src={preview} alt="" fill className={cn('object-cover')} />
                                                <span
                                                    onClick={handleCancelPreview}
                                                    className={cn(
                                                        'absolute inset-0 hidden items-center justify-center bg-[#e9e8e861] opacity-0',
                                                        'group-hover:flex group-hover:opacity-100'
                                                    )}
                                                >
                                                    <HiOutlineTrash size={40} color="red" />
                                                </span>
                                            </div>
                                        ) : (
                                            <Button
                                                color="success"
                                                className={cn('font-medium text-white')}
                                                onClick={handleOpenFile}
                                                startContent={<HiOutlineCloudUpload />}
                                            >
                                                Tải Lên
                                            </Button>
                                        )}
                                    </div>
                                </Tab>
                            </Tabs>
                            {/* End Tab Content */}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose} className={cn('font-medium')}>
                                Huỷ Bỏ
                            </Button>
                            <Button color="primary" onPress={onClose} className={cn('font-medium text-white')}>
                                Xác Nhận
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalAvatar;
