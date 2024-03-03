import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default PublicLayout;
