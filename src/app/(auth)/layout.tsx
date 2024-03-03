import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react';

const PrivateLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default PrivateLayout;
