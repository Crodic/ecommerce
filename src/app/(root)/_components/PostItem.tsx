import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const PostItem = () => {
    return (
        <div className="w-auto h-[350px] hover:h-[320px] transition-all duration-150 cursor-pointer border shadow-lg">
            <div className="post-image h-[50%] w-full relative">
                <Image
                    src="https://source.unsplash.com/random/450x300"
                    alt=""
                    fill
                    className="object-cover group-hover:scale-[1.2] group-hover:-translate-y-2 transition-all duration-200"
                />
            </div>
            <div className="p-3">
                <p className="uppercase font-bold line-clamp-1">Hướng dẫn cách trồng cây hiệu quả</p>
                <p className="line-clamp-3 opacity-50 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti corporis nostrum ullam
                    praesentium quaerat autem hic magni totam provident temporibus repellendus molestiae, odio aperiam
                    aut id consequatur ducimus assumenda?
                </p>
                <Button size="sm" variant="light" color="danger" className="mt-3 font-bold">
                    Xem Chi Tiết
                </Button>
            </div>
        </div>
    );
};

export default PostItem;
