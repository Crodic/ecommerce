import { Divider } from '@nextui-org/react';
import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { HiArchive, HiCalendar, HiLockOpen } from 'react-icons/hi';
import PostMiniItem from './PostMiniItem';

const SideBarRight = () => {
    return (
        <aside className="rounded-md shadow-md p-3 h-[max-content]">
            <h2 className="uppercase text-lg font-semibold my-3">Chính sách giao hàng</h2>
            <ul className="flex flex-col gap-3">
                <li className="w-full flex items-center p-3 gap-5 border bg-white shadow">
                    <HiCalendar size={20} />
                    <span>Giao Trong Ngày</span>
                </li>
                <li className="w-full flex items-center p-3 gap-5 border bg-white shadow">
                    <FaShippingFast size={20} />
                    <span>Miễn phí vận chuyển</span>
                </li>
                <li className="w-full flex items-center p-3 gap-5 border bg-white shadow">
                    <HiLockOpen size={20} />
                    <span>An toàn tuyệt đối</span>
                </li>
                <li className="w-full flex items-center p-3 gap-5 border bg-white shadow">
                    <HiArchive size={20} />
                    <span>Hoàn Trả</span>
                </li>
            </ul>
            <Divider className="my-4" />
            <h2 className="uppercase text-lg font-semibold my-3">Bài viết nổi bật</h2>
            <div className="flex flex-col gap-3">
                {new Array(8).fill(null).map((post, index) => {
                    return <PostMiniItem key={index} />;
                })}
            </div>
        </aside>
    );
};

export default SideBarRight;
