'use client';

import { useSession } from 'next-auth/react';

const DashboardPage = () => {
    const { data: session } = useSession();
    return (
        <>
            <h2 className="text-2xl font-extrabold text-center">Xin Chào, Quản Trị Viên {session?.user.name}</h2>
        </>
    );
};

export default DashboardPage;
