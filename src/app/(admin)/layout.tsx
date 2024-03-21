'use client';
import { Button, Divider } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { GiExitDoor } from 'react-icons/gi';
import { HiOutlineTerminal } from 'react-icons/hi';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-[250px_1fr] min-h-svh">
            <aside className="bg-gray-300">
                <h1 className="text-center p-5 text-xl font-bold">ADMIN DASHBOARD</h1>
                <Divider className="mb-2" />
                <ul>
                    <li className="flex p-3 items-center gap-5 hover:bg-slate-300 hover:font-bold transition-all duration-200">
                        <HiOutlineTerminal size={20} />
                        <Link href={'/dashboard/product'}>Quản Lý Sản Phẩm</Link>
                    </li>
                </ul>
            </aside>
            <section>
                <nav className="p-3 px-8 flex justify-between items-center">
                    <Link
                        href={'/'}
                        className="text-lg font-medium hover:underline transition-all duration-100 text-primary"
                    >
                        Về Trang Chủ
                    </Link>
                    <Button
                        isIconOnly
                        color="danger"
                        onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
                    >
                        <GiExitDoor size={20} />
                    </Button>
                </nav>
                <div className="p-10">{children}</div>
            </section>
        </div>
    );
};

export default AdminLayout;
