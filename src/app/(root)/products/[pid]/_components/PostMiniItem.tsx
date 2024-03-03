import Image from 'next/image';
import React from 'react';

const PostMiniItem = () => {
    return (
        <div className="w-full flex gap-3 cursor-pointer">
            <div className="relative w-[50px] h-[50px] flex-shrink-0">
                <Image src="https://source.unsplash.com/random/200×300" alt="" fill />
            </div>
            <p className="line-clamp-2 text-sm hover:text-primary">Những biện pháp chăm sóc cây cảnh</p>
        </div>
    );
};

export default PostMiniItem;
