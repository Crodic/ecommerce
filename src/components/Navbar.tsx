/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import MainLogo from '@/assets/icons/MainLogo';
import useGetUser from '@/hooks/libs/useGetUser';
import { cn } from '@/libs/utils';
import { LISTS } from '@/utils/var';
import {
    Badge,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Skeleton,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { HiSearch, HiShoppingCart, HiUser, HiUserCircle } from 'react-icons/hi';

const bungee = Bungee({
    subsets: ['vietnamese'],
    weight: ['400'],
});

export default function Navbar() {
    const pathname = usePathname();
    const { push } = useRouter();
    const { data: session, status } = useSession();
    const { data: user } = useGetUser(session?.user.id as string);
    console.log(session);

    const render = useCallback(() => {
        if (status === 'unauthenticated') {
            return (
                <Button
                    variant="light"
                    size="sm"
                    className={cn('hidden items-center justify-center', 'md:flex')}
                    isIconOnly
                    onClick={() => push('/login')}
                >
                    <HiUser size={20} />
                </Button>
            );
        }
        if (status === 'loading') {
            return <Skeleton className="w-[30px] h-[30px] rounded-md" />;
        }
        if (status === 'authenticated') {
            return (
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="light"
                            size="sm"
                            className={cn('hidden items-center justify-center', 'md:flex')}
                            isIconOnly
                        >
                            <HiUserCircle size={25} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="list">
                        <DropdownItem key="account">Thông tin tài khoản</DropdownItem>
                        <DropdownItem key="bill">Đơn hàng của tôi</DropdownItem>
                        <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={() => signOut({ redirect: false })}
                        >
                            Đăng xuất
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
        }
    }, [status]);
    return (
        <nav className="h-[100px] w-full sticky top-0 z-[50] bg-white shadow-md">
            <div className="wrapper flex justify-between items-center h-full px-2 md:px-0">
                <div className="logo flex items-center gap-4">
                    <MainLogo />
                    <h1 className="flex flex-col">
                        <span className={cn(bungee.className, 'text-2xl text-logo text-center')}>CAME</span>
                        <span className="capitalize text-xs text-blue-400">indoor plants</span>
                    </h1>
                </div>
                <ul className={cn('lists hidden items-center gap-10', 'md:flex')}>
                    {LISTS.map((menu, index) => {
                        const isActive = pathname === menu.path;
                        return (
                            <li
                                key={index}
                                className={cn(
                                    'uppercase font-bold',
                                    isActive && 'text-primary',
                                    'hover:text-secondary'
                                )}
                            >
                                <Link href={menu.path}>{menu.title}</Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="authentication flex gap-4">
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <Button variant="light" size="sm" isIconOnly>
                                <HiSearch size={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <Input
                                    placeholder="Nhập Tên Sản Phẩm"
                                    size="sm"
                                    startContent={<HiSearch size={20} />}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                    {render()}
                    <Button
                        variant="light"
                        size="sm"
                        className={cn('hidden items-center justify-center', 'md:flex')}
                        isIconOnly
                        onClick={() => push(`/cart`)}
                    >
                        <Badge content={user?.data.data.user.cart.length || 0} placement="bottom-right" color="danger">
                            <HiShoppingCart size={20} />
                        </Badge>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
