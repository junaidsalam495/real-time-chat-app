"use client"
import { MessageCircle } from 'lucide-react';
import React from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { clearAuth } from '@/redux/authSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(clearAuth());
        toast.success('Logged out successfully');
        router.push('/auth/login');
    };

    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between py-4">
                <Link href="/" className="flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">ChatApp</span>
                </Link>

                <div className="flex items-center gap-4">
                    <ModeToggle />

                    <div className="hidden md:flex gap-4">
                        <Link href="/features">
                            <Button variant="ghost">Features</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="ghost">About</Button>
                        </Link>
                    </div>

                    {!token ? (
                        <div className="flex gap-2">
                            <Link href="/auth/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button variant="default">Sign Up</Button>
                            </Link>
                        </div>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={user?.avatar || '/placeholder.svg'}
                                        alt={user?.name || 'User'}
                                    />
                                    <AvatarFallback>
                                        {user?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push('/profile')}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/chat')}>
                                    Chat
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
