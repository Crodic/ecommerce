'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BsGoogle } from 'react-icons/bs';
import MainLogo from '@/assets/icons/MainLogo';

interface IFormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [selected, setSelected] = useState<string | number>('login');
    const [formData, setFormData] = useState<IFormData>({ email: '', password: '' });
    const { replace } = useRouter();

    const handleLogin = async () => {
        try {
            await signIn('credentials', { ...formData, callbackUrl: '/', redirect: false });
            replace('/');
        } catch (error) {
            throw new Error('Login Failed');
        }
    };

    return (
        <div className="wrapper w-full my-5">
            <div className="flex flex-col items-center justify-center w-full ">
                <Card className="max-w-full w-[340px] h-[max-content]">
                    <CardBody className="overflow-hidden">
                        <div className="flex gap-3 items-center justify-center mb-4">
                            <MainLogo />
                            <h1 className="text-center font-bold text-xl mb-5">CAME Account</h1>
                            <MainLogo />
                        </div>
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key="login" title="Đăng Nhập">
                                <form className="flex flex-col gap-4">
                                    <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                        Need to create an account?{' '}
                                        <Link size="sm" onPress={() => setSelected('sign-up')}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary" onClick={handleLogin}>
                                            Login
                                        </Button>
                                    </div>
                                    <Divider className="my-2" />
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            fullWidth
                                            color="default"
                                            variant="ghost"
                                            onClick={handleLogin}
                                            startContent={<BsGoogle size={20} />}
                                        >
                                            Đăng Nhập Với Google
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Đăng Ký">
                                <form className="flex flex-col gap-4 h-[300px]">
                                    <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                                    <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                        Already have an account?{' '}
                                        <Link size="sm" onPress={() => setSelected('login')}>
                                            Login
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary">
                                            Sign up
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
