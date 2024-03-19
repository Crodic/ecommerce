'use client';
import useFetchDistrict from '@/hooks/libs/useFetchDistrict';
import useFetchProvince from '@/hooks/libs/useFetchProvince';
import useFetchWard from '@/hooks/libs/useFetchWard';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface IAddress {
    province: { name: string; code: string };
    district: { name: string; code: string };
    ward: { name: string; code: string };
    address: string;
}

interface IModalAddress {
    isOpen: boolean;
    onOpenChange: () => void;
    handleSubmit: (data: any) => void;
}

export default function ModalAddress({ isOpen, onOpenChange, handleSubmit }: IModalAddress) {
    const [addressApi, setAddressApi] = useState({ provinces: [], districts: [], wards: [] });
    const [formData, setFormData] = useState<IAddress>({
        province: { name: '', code: '' },
        district: { name: '', code: '' },
        ward: { name: '', code: '' },
        address: '',
    });
    const { data: province } = useFetchProvince();
    const { data: district } = useFetchDistrict({ provinceId: formData.province.code });
    const { data: ward } = useFetchWard({ districtId: formData.district.code });

    useEffect(() => {
        if (province) setAddressApi((prev) => ({ ...prev, provinces: province.data.data }));
    }, [province]);

    useEffect(() => {
        if (district) setAddressApi((prev) => ({ ...prev, districts: district.data.data }));
    }, [district]);

    useEffect(() => {
        if (ward) setAddressApi((prev) => ({ ...prev, wards: ward.data.data }));
    }, [ward]);

    const handleChangeProvince = (e: { target: { value: any } }) => {
        const obj = JSON.parse(e.target.value);
        setFormData((prev) => ({ ...prev, province: obj }));
    };

    const handleChangeDistrict = (e: { target: { value: any } }) => {
        const obj = JSON.parse(e.target.value);
        setFormData((prev) => ({ ...prev, district: obj }));
    };

    const handleChangeWard = (e: { target: { value: any } }) => {
        const obj = JSON.parse(e.target.value);
        setFormData((prev) => ({ ...prev, ward: obj }));
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Chọn Địa Chỉ Mới</ModalHeader>
                        <ModalBody>
                            <Select label="Nhập Tỉnh/Thành Phố" fullWidth size="sm" onChange={handleChangeProvince}>
                                {addressApi.provinces.map((province: any) => {
                                    const value = {
                                        code: province.ProvinceID,
                                        name: province.ProvinceName,
                                    };
                                    return (
                                        <SelectItem value={JSON.stringify(value)} key={JSON.stringify(value)}>
                                            {province.ProvinceName}
                                        </SelectItem>
                                    );
                                })}
                            </Select>
                            <Select
                                label="Nhập Quận/Huyện"
                                fullWidth
                                size="sm"
                                onChange={handleChangeDistrict}
                                isDisabled={formData.province.code === ''}
                            >
                                {addressApi.districts.map((district: any) => {
                                    const value = {
                                        code: district.DistrictID,
                                        name: district.DistrictName,
                                    };
                                    return (
                                        <SelectItem value={JSON.stringify(value)} key={JSON.stringify(value)}>
                                            {district.DistrictName}
                                        </SelectItem>
                                    );
                                })}
                            </Select>
                            <Select
                                label="Nhập Phường/Xã"
                                fullWidth
                                size="sm"
                                onChange={handleChangeWard}
                                isDisabled={formData.district.code === ''}
                            >
                                {addressApi.wards.map((ward: any) => {
                                    const value = {
                                        code: ward.WardCode,
                                        name: ward.WardName,
                                    };
                                    return (
                                        <SelectItem value={JSON.stringify(value)} key={JSON.stringify(value)}>
                                            {ward.WardName}
                                        </SelectItem>
                                    );
                                })}
                            </Select>
                            <Input
                                label="Nhập Địa Chỉ"
                                placeholder="VD: 180 Cao Lỗ"
                                size="sm"
                                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Huỷ
                            </Button>
                            <Button
                                color="primary"
                                onPress={onClose}
                                onClick={() => handleSubmit(formData)}
                                isDisabled={
                                    formData.address &&
                                    formData.province.code &&
                                    formData.district.code &&
                                    formData.ward.code
                                        ? false
                                        : true
                                }
                            >
                                Đồng Ý
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
