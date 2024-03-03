import { Button, Divider, Input } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { HiSearch } from 'react-icons/hi';
import PostMiniItem from '../products/[pid]/_components/PostMiniItem';

const NewsPostPage = () => {
    return (
        <div className="mb-20">
            <section className="hero relative">
                <div className="relative w-full h-[350px]">
                    <Image src="https://source.unsplash.com/random/1200×350" alt="" fill />
                </div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <div>
                        <h2 className="text-base font-semibold text-white text-center">Tin tức</h2>
                        <p className="text-xl font-semibold text-white text-center opacity-70">
                            Cách trồng hoa hiệu quả
                        </p>
                    </div>
                </div>
            </section>
            <section className="wrapper grid grid-cols-[300px_1fr] gap-5 mt-10">
                <aside className="p-3 h-[max-content]">
                    <div className="flex gap-3">
                        <Input placeholder="Nhập từ khoá tìm kiếm..." size="sm" />
                        <Button isIconOnly size="lg">
                            <HiSearch size={20} />
                        </Button>
                    </div>
                    <h3 className="text-lg uppercase font-bold mt-4">Bài viết mới</h3>
                    <Divider className="my-3" />
                    <div className="flex-col flex gap-3 border-dotted border-4 p-2 border-white">
                        {new Array(6).fill(null).map((post, index) => {
                            return <PostMiniItem key={index} />;
                        })}
                    </div>
                </aside>
                <div className="shadow-md rounded-md p-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis adipisci mollitia ipsum, sit
                    alias deserunt maxime veniam sint cupiditate vitae facilis. Deserunt harum impedit nulla ducimus
                    maiores suscipit omnis saepe! Ab similique, non aliquam hic id impedit perspiciatis necessitatibus
                    ratione tempore quam nobis error dolorem laboriosam, sunt officia sint molestias alias enim atque
                    vero temporibus perferendis ea! Non, magni dolores! Optio culpa vitae, voluptates et sint
                    consequuntur. Dolore alias, eius nisi at molestias rerum molestiae odio tempora est accusantium,
                    quod reprehenderit perferendis ipsam repellat omnis impedit corporis, minus quo velit! Rerum facere
                    quaerat, sapiente reprehenderit consequuntur ab voluptates laboriosam tempora odit ex maiores
                    praesentium cum magni animi nihil? Expedita, molestiae magni quia voluptas nobis laborum sit
                    assumenda aut maxime voluptates! Sapiente, harum. Corrupti architecto aliquid eius voluptate nobis
                    expedita minus itaque necessitatibus accusamus nam similique dignissimos perspiciatis eos
                    repudiandae impedit, fugit sint cum eum perferendis, nesciunt quis ullam ipsam! Provident. Vitae
                    beatae animi reiciendis sapiente deleniti, explicabo nisi cum ea quo in? Reiciendis, obcaecati, quam
                    adipisci ex iste consequatur dolor accusantium facere eligendi et facilis nemo! Qui, voluptate!
                    Repellendus, distinctio? Soluta, magni nam? Quasi eveniet laudantium corporis, repellendus sit,
                    expedita porro aut, magni ipsum labore beatae at dolorum esse modi amet saepe? Ullam magnam,
                    eligendi commodi praesentium deleniti quos cupiditate? Itaque beatae reprehenderit, hic aperiam
                    molestiae saepe reiciendis ullam optio minus deleniti officia esse sequi debitis inventore unde
                    quia! Quidem hic repudiandae est, fugiat nesciunt voluptas voluptatem ipsa cupiditate quisquam?
                    Repellat nam ducimus distinctio aliquam fugit animi sequi expedita quibusdam est modi suscipit
                    nostrum, eius cumque sint ullam, excepturi ratione at, eum quod consectetur aliquid explicabo? Quo
                    ducimus rem nemo. At a nam commodi quisquam adipisci, dolores ad sequi delectus repellendus soluta
                    ipsa? Quibusdam animi molestias vel amet velit. Perferendis, modi optio animi aliquam odio doloribus
                    libero rerum assumenda obcaecati.
                </div>
            </section>
        </div>
    );
};

export default NewsPostPage;
