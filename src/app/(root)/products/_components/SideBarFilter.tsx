import { Divider, Slider } from '@nextui-org/react';
import React from 'react';

const SideBarFilter = () => {
    return (
        <aside className="border rounded-lg shadow-md p-2 h-[max-content]">
            <div>
                <h3 className="text-lg font-bold uppercase">Danh Mục Sản Phẩm</h3>
                <ul className="pl-2 mt-2">
                    <li className="mb-1">Dụng Cụ</li>
                    <li className="mb-1">Cây Cảnh</li>
                    <li className="mb-1">Hoa Trang Trí</li>
                </ul>
            </div>
            <Divider className="my-4" />
            <div>
                <h3 className="text-lg font-bold uppercase my-3">Lọc Theo Giá</h3>
                <Slider
                    label="Price Range"
                    size="sm"
                    step={50}
                    minValue={0}
                    maxValue={1000}
                    defaultValue={[100, 500]}
                    formatOptions={{ style: 'currency', currency: 'USD' }}
                    className="w-full"
                />
            </div>
            <Divider className="my-4" />
            <div>
                <h3 className="text-lg font-bold uppercase my-3">Gợi Ý</h3>
                <div></div>
            </div>
        </aside>
    );
};

export default SideBarFilter;
