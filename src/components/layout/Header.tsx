"use client";

import Image from "next/image";
import {Avatar, Button, Popover, Space, Spin} from "antd";
import {useState} from "react";
import {useUser} from '@auth0/nextjs-auth0/client';

export default function Header() {
    const [open, setOpen] = useState(false);
    const {user, isLoading} = useUser();

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const handleSignOut = () => {
        window.location.href = '/api/auth/logout';
    };

    return (
        <div className="flex flex-row items-center h-full px-4">
            <div className="flex flex-row justify-center items-center flex-grow">
                <div>
                    <Image src="/weather-app-logo.png" alt="weather app logo" width={60} height={60}/>
                </div>
                <div className="text-white text-xl font-semibold ml-2">
                    Weather App
                </div>
            </div>

            <div className="ml-auto">
                {
                    isLoading ?
                        <Spin/> :
                        <Popover
                            content={
                                <div>
                                    <Button
                                        variant="outlined"
                                        color="danger"
                                        onClick={handleSignOut}
                                        block
                                    >
                                        Sign out
                                    </Button>
                                </div>
                            }
                            title={
                                <div className="flex w-full justify-center">{user?.name}</div>
                            }
                            trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange}
                            placement="bottomRight"
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Avatar
                                        style={{verticalAlign: 'middle'}}
                                        size="large"
                                        src={user?.picture}
                                    >
                                        {user?.name?.charAt(0)}
                                    </Avatar>
                                </Space>
                            </a>
                        </Popover>
                }
            </div>
        </div>
    );
}