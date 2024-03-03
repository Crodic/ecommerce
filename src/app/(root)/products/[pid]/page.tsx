import Breadcrumbs from '@/components/Breadcrumbs';
import React from 'react';
import SideBarRight from './_components/SideBarRight';
import ProductCarousel from './_components/ProductCarousel';
import { Button, Divider } from '@nextui-org/react';
import TabsPreview from './_components/TabsPreview';
import ProductItem from '../../_components/ProductItem';

const ProductDetailPage = () => {
    return (
        <div className="wrapper my-8">
            <Breadcrumbs />
            <div>
                <div className="grid grid-cols-[1fr_250px] my-10 gap-10 p-3">
                    <div className="content flex flex-col">
                        <div className="flex items-start gap-5">
                            <div className="w-[400px] h-[520px]">
                                <ProductCarousel />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold">Cây Lau Quý Hiếm</h2>
                                <p className="text-xs opacity-45 mt-1">
                                    Mã sản phẩm <span>T01537152</span>
                                </p>
                                <Divider className="my-3" />
                                <span className="text-2xl font-semibold">561.000 đ</span>
                                <p className="my-3">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti maxime enim
                                    eum, voluptas excepturi doloremque similique voluptatem, quas sed et temporibus,
                                    repudiandae corporis? Eos corporis ipsa aspernatur doloribus eaque?
                                </p>
                                <div className="flex items-center border border-white w-[max-content] rounded-md shadow-md">
                                    <span className="p-1 w-[30px] text-xl font-semibold flex justify-center items-center cursor-pointer">
                                        -
                                    </span>
                                    <input
                                        type="number"
                                        className="w-[100px] p-1 text-center border-none outline-none"
                                    />
                                    <span className="p-1 w-[30px] text-xl font-semibold flex justify-center items-center cursor-pointer">
                                        +
                                    </span>
                                </div>
                                <div className="mt-5 flex gap-5">
                                    <Button color="secondary" variant="solid">
                                        Mua Ngay
                                    </Button>
                                    <Button color="danger" variant="bordered">
                                        Thêm Vào Giỏ Hàng
                                    </Button>
                                </div>
                                <Divider className="my-4" />
                                <span className="text-xs opacity-55">Danh mục: Cây Trang Trí</span>
                            </div>
                        </div>
                        <Divider className="my-4" />
                        <TabsPreview />
                        <Divider className="my-4" />
                        <h3 className="text-xl font-bold mb-3">Sản Phẩm Tương Tự</h3>
                        <div className="w-[920px] h-[320px] overflow-x-scroll flex justify-start gap-5">
                            {new Array(20).fill(null).map((product, index) => {
                                return <ProductItem key={index} width="200px" />;
                            })}
                        </div>
                    </div>
                    <SideBarRight />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
