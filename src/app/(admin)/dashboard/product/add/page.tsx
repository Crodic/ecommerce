'use client';
import { authAxios } from '@/services/axios';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const AddProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        title: '',
        description: '',
        summary: '',
        price: '',
        sale: '',
        inventory: '',
        category: '65ed3be1c09880c7a3b68c5f',
    });
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const { replace } = useRouter();
    const captureRef = useRef<HTMLInputElement>(null);
    const imagesRef = useRef<HTMLInputElement>(null);
    const { mutate } = useMutation({
        mutationFn: (data: any) =>
            authAxios.post('/product', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }),
        onSuccess: () => {
            setLoading(false);
            queryClient.invalidateQueries({ queryKey: ['product'] });
            toast.success('Thêm sản phẩm thành công');
            replace('/dashboard/product');
        },
    });

    const handleSubmit = async () => {
        setLoading(true);
        const capture = (captureRef.current as any).files[0];
        const images = (imagesRef.current as any).files;
        const formData = new FormData();
        for (const image of images) {
            formData.append('images', image);
        }
        formData.append('capture', capture);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('summary', data.summary);
        formData.append('price', data.price);
        formData.append('sale', data.sale);
        formData.append('inventory', data.inventory);
        formData.append('category', data.category);
        mutate(formData);
        setLoading(false);
    };
    return (
        <>
            <h2 className="text-2xl font-bold">Thêm sản phẩm</h2>
            <div className="p-3 border rounded-lg shadow-md my-5 flex flex-col gap-4">
                <Input
                    isRequired
                    onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                    label="Tên sản phẩm"
                    labelPlacement="outside-left"
                    placeholder="Nhập Tên Sản Phẩm"
                />
                <Textarea
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                    label="Mô tả sản phẩm"
                    labelPlacement="outside-left"
                    placeholder="Nhập Mô Tả Sản Phẩm"
                />
                <Textarea
                    onChange={(e) => setData((prev) => ({ ...prev, summary: e.target.value }))}
                    label="Tóm tắt sản phẩm"
                    labelPlacement="outside-left"
                    placeholder="Nhập Tóm Tắt Sản Phẩm"
                />
                <Input
                    isRequired
                    onChange={(e) => setData((prev) => ({ ...prev, price: e.target.value }))}
                    label="Giá sản phẩm"
                    labelPlacement="outside-left"
                    placeholder="Nhập Giá Sản Phẩm"
                />
                <Input
                    label="% Khuyến Mãi"
                    labelPlacement="outside-left"
                    placeholder="Nhập Khuyến Mãi"
                    type="number"
                    min={0}
                    max={100}
                    fullWidth
                    onChange={(e) => setData((prev) => ({ ...prev, sale: e.target.value }))}
                />
                <Input
                    isRequired
                    onChange={(e) => setData((prev) => ({ ...prev, inventory: e.target.value }))}
                    label="Tồn Kho"
                    labelPlacement="outside-left"
                    placeholder="Nhập Tồn Kho"
                    type="number"
                />
                <div className="flex gap-3">
                    <label htmlFor="">Ảnh Sản Phẩm</label>
                    <input type="file" ref={captureRef} required />
                </div>
                <div className="flex gap-3">
                    <label htmlFor="">Ảnh Mô Tả (Tối đa 5 ảnh)</label>
                    <input type="file" multiple ref={imagesRef} />
                </div>
                <Button fullWidth color="primary" onClick={handleSubmit} isLoading={loading}>
                    Xác Nhận
                </Button>
            </div>
        </>
    );
};

export default AddProductPage;
