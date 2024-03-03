import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react';

interface IModalAddress {
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function ModalAddress({ isOpen, onOpenChange }: IModalAddress) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Chọn Địa Chỉ Mới</ModalHeader>
                        <ModalBody>
                            <Select label="Nhập Tỉnh/Thành Phố" fullWidth size="sm">
                                <SelectItem key={1} value="1">
                                    a
                                </SelectItem>
                                <SelectItem key={2} value="2">
                                    a
                                </SelectItem>
                            </Select>
                            <Select label="Nhập Quận/Huyện" fullWidth size="sm">
                                <SelectItem key={1} value="1">
                                    a
                                </SelectItem>
                                <SelectItem key={2} value="2">
                                    a
                                </SelectItem>
                            </Select>
                            <Select label="Nhập Phường/Xã" fullWidth size="sm">
                                <SelectItem key={1} value="1">
                                    a
                                </SelectItem>
                                <SelectItem key={2} value="2">
                                    a
                                </SelectItem>
                            </Select>
                            <Input label="Nhập Địa Chỉ" placeholder="VD: 180 Cao Lỗ" size="sm" multiple />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Huỷ
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Đồng Ý
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
