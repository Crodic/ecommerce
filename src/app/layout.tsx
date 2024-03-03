import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '../components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Trang chủ | Công Ty Mua Bán Cây Cảnh',
    description: 'Mua bán các loại cây cảnh được châm chuốt kỷ lưỡng, xanh đẹp.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <main className="w-full">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
