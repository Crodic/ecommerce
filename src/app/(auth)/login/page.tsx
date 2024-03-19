'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BsGoogle } from 'react-icons/bs';
import MainLogo from '@/assets/icons/MainLogo';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/services/axios';

interface IFormData {
    email: string;
    password: string;
}
interface IRegister extends IFormData {
    firstname: string;
    lastname: string;
    re_password: string;
}

export default function LoginPage() {
    const [selected, setSelected] = useState<string | number>('login');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<IFormData>({ email: '', password: '' });
    const [formDataRegister, setFormDataRegister] = useState<IRegister>({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        re_password: '',
    });
    const { mutate } = useMutation({
        mutationFn: (data: IRegister) => axiosInstance.post('/auth/register', { ...data }),
    });

    const { replace } = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const status = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                callbackUrl: '/',
                redirect: false,
            });
            if (status?.ok) {
                replace('/');
            }
        } catch (error) {
            throw new Error('Login Failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            mutate(formDataRegister);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wrapper w-full my-5">
            <div className="flex flex-col items-center justify-center w-full">
                <Card className="max-w-full w-[400px] h-[520px]">
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
                            <Tab key="login" title="Đăng Nhập" isDisabled={loading}>
                                <form className="flex flex-col gap-4">
                                    <Input
                                        isRequired
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    />
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                    />
                                    <p className="text-center text-small">
                                        Need to create an account?{' '}
                                        <Link size="sm" onPress={() => setSelected('sign-up')}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary" onClick={handleLogin} isLoading={loading}>
                                            Login
                                        </Button>
                                    </div>
                                    <Divider className="my-2" />
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            fullWidth
                                            color="default"
                                            variant="ghost"
                                            onClick={() => signIn('google', { callbackUrl: '/' })}
                                            startContent={<BsGoogle size={20} />}
                                        >
                                            Đăng Nhập Với Google
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Đăng Ký" isDisabled={loading}>
                                <form className="flex flex-col gap-4 h-[300px]">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input
                                            isRequired
                                            label="Fistname"
                                            placeholder="Enter your name"
                                            type="text"
                                            value={formDataRegister.firstname}
                                            onChange={(e) =>
                                                setFormDataRegister((prev) => ({ ...prev, firstname: e.target.value }))
                                            }
                                        />
                                        <Input
                                            isRequired
                                            label="Lastname"
                                            placeholder="Enter your name"
                                            type="text"
                                            value={formDataRegister.lastname}
                                            onChange={(e) =>
                                                setFormDataRegister((prev) => ({ ...prev, lastname: e.target.value }))
                                            }
                                        />
                                    </div>
                                    <Input
                                        isRequired
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
                                        value={formDataRegister.email}
                                        onChange={(e) =>
                                            setFormDataRegister((prev) => ({ ...prev, email: e.target.value }))
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Mật khẩu"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={formDataRegister.password}
                                        onChange={(e) =>
                                            setFormDataRegister((prev) => ({ ...prev, password: e.target.value }))
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Nhập lại mật khẩu"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={formDataRegister.re_password}
                                        onChange={(e) =>
                                            setFormDataRegister((prev) => ({ ...prev, re_password: e.target.value }))
                                        }
                                    />
                                    <p className="text-center text-small">
                                        Already have an account?{' '}
                                        <Link size="sm" onPress={() => setSelected('login')}>
                                            Login
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            fullWidth
                                            color="primary"
                                            onClick={() => handleRegister()}
                                            isLoading={loading}
                                        >
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
