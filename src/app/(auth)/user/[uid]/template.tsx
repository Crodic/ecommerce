import React, { ReactNode } from 'react';

const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-[250px_1fr_250px]">
            <aside></aside>
            {children}
            <aside></aside>
        </div>
    );
};

export default UserLayout;
