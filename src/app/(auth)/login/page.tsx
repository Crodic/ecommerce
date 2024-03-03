'use client';
import React from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from '@nextui-org/react';

export default function LoginPage() {
    const [selected, setSelected] = React.useState<string | number>('login');

    return (
        <div className="wrapper w-full my-5">
            <h1 className="text-center font-bold text-2xl mb-5">Mua, Bán Cây Cảnh Uy Tín Số 1</h1>
            <div className="flex flex-col items-center justify-center w-full ">
                <Card className="max-w-full w-[340px] h-[max-content]">
                    <CardBody className="overflow-hidden">
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
                                        <Button fullWidth color="primary">
                                            Login
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
