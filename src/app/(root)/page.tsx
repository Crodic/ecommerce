'use client';
import MainLogo from '@/assets/icons/MainLogo';
import Banner from '@/components/Banner';
import { BANNER } from '@/utils/var';
import { Button, Skeleton } from '@nextui-org/react';
import ProductItem from './_components/ProductItem';
import { cn } from '@/libs/utils';
import PostItem from './_components/PostItem';
import useFetchProduct from '@/hooks/libs/useFetchProduct';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { data, isFetching } = useFetchProduct();
    const { push } = useRouter();

    const button = (
        <div
            className={cn(
                'mx-auto mt-6 w-[max-content] transition-all duration-250',
                'hover:-translate-y-2 hover:scale-[1.1] hover:shadow-xl'
            )}
        >
            <Button color="primary" variant="shadow" className="uppercase font-bold" onClick={() => push(`/products`)}>
                Xem Thêm
            </Button>
        </div>
    );

    return (
        <main>
            <Banner banners={BANNER} />

            <section className="my-[100px] wrapper">
                <div className="flex justify-center gap-5 mb-5">
                    <MainLogo />
                    <h2 className="text-center text-2xl font-bold uppercase">Các Loại Cây Cảnh</h2>
                    <MainLogo />
                </div>

                <div className="grid grid-cols-5 gap-1">
                    {isFetching &&
                        new Array(10).fill(null).map((_, index) => {
                            return <Skeleton className="h-[300px]" key={index} />;
                        })}
                    {data &&
                        data.data.data.products.map((product: any, index: number) => {
                            return <ProductItem key={index} product={product} />;
                        })}
                </div>
                {button}
            </section>

            <section className="my-[100px] wrapper">
                <div className="flex justify-center gap-5 mb-5">
                    <MainLogo />
                    <h2 className="text-center text-2xl font-bold uppercase">Các Loại Cây Cảnh</h2>
                    <MainLogo />
                </div>

                <div className="grid grid-cols-5 gap-1">
                    {isFetching &&
                        new Array(10).fill(null).map((_, index) => {
                            return <Skeleton className="h-[300px]" key={index} />;
                        })}
                    {data &&
                        data.data.data.products.map((product: any, index: number) => {
                            return <ProductItem key={index} product={product} />;
                        })}
                </div>
                {button}
            </section>

            <section className="my-[100px] wrapper">
                <div className="flex justify-center gap-5 mb-5">
                    <MainLogo />
                    <h2 className="text-center text-2xl font-bold uppercase">Các Loại Cây Cảnh</h2>
                    <MainLogo />
                </div>

                <div className="grid grid-cols-5 gap-1">
                    {isFetching &&
                        new Array(10).fill(null).map((_, index) => {
                            return <Skeleton className="h-[300px]" key={index} />;
                        })}
                    {data &&
                        data.data.data.products.map((product: any, index: number) => {
                            return <ProductItem key={index} product={product} />;
                        })}
                </div>
                {button}
            </section>

            <section className="my-[100px] wrapper">
                <div className="flex justify-center gap-5 mb-5">
                    <MainLogo />
                    <h2 className="text-center text-2xl font-bold uppercase">Các Loại Cây Cảnh</h2>
                    <MainLogo />
                </div>

                <div className="grid grid-cols-5 gap-1">
                    {isFetching &&
                        new Array(10).fill(null).map((_, index) => {
                            return <Skeleton className="h-[300px]" key={index} />;
                        })}
                    {data &&
                        data.data.data.products.map((product: any, index: number) => {
                            return <ProductItem key={index} product={product} />;
                        })}
                </div>
                {button}
            </section>

            <section className="my-[100px] wrapper">
                <div className="flex justify-center gap-5 mb-5">
                    <MainLogo />
                    <h2 className="text-center text-2xl font-bold uppercase">Bài viết nổi bật</h2>
                    <MainLogo />
                </div>

                <div className="grid grid-cols-3 gap-5">
                    {new Array(3).fill(null).map((_, index) => {
                        return <PostItem key={index} />;
                    })}
                </div>

                {button}
            </section>
        </main>
    );
}
