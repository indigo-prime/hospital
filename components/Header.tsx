"use client";
import { auth, signOut, signIn } from "@/auth";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    IoHomeOutline,
    IoSearchOutline,
    IoLocationOutline,
    IoTrendingUpOutline,
    IoCalendarOutline,
    IoMenuOutline,
    IoFastFoodOutline,
    IoPeopleOutline,
    IoMoonOutline,
    IoInformationCircleOutline,
    IoInformationOutline,
    IoMailOutline,
    IoPersonOutline,
    IoChatbubblesOutline,
    IoBookmarkOutline,
    IoSettingsOutline,
    IoLogOutOutline,
} from 'react-icons/io5';

const Header =async ()=> {
    const session = await auth();

    // Dropdown states
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Ref for the entire nav to detect outside clicks
    const navRef = useRef(null);

    // Handle outside clicks to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setIsAboutOpen(false);
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside, { capture: true });
        return () => document.removeEventListener('click', handleClickOutside, { capture: true });
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-mtoko-light via-mtoko-secondary to-mtoko-primary py-[10px] z-[100] shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-b-[16px]">
            <div className="max-w-[975px] mx-auto flex justify-between items-center px-[20px]">
                {/* Logo */}
                <Link href="/" className="text-[24px] font-bold text-mtoko-light">
                    <Image src="/mtoko.png" alt="Mtoko" width={100} height={30}/>
                </Link>

                {/* Nav Links */}
                <nav ref={navRef} className="flex items-center gap-[22px] md:gap-[30px]">
                    <Link href="/" className="text-mtoko-light hover:text-mtoko-accent">
                        <IoHomeOutline className="text-[24px]" />
                    </Link>
                    <Link href="/search" className="text-mtoko-light hover:text-mtoko-accent">
                        <IoSearchOutline className="text-[24px]" />
                    </Link>
                    <Link href="/near-me" className="text-mtoko-light hover:text-mtoko-accent">
                        <IoLocationOutline className="text-[24px]" />
                    </Link>
                    <Link href="/trending" className="text-mtoko-light hover:text-mtoko-accent">
                        <IoTrendingUpOutline className="text-[24px]" />
                    </Link>
                    <Link href="/reservation" className="text-mtoko-light hover:text-mtoko-accent">
                        <IoCalendarOutline className="text-[24px]" />
                    </Link>

                    {/* Menu Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                setIsAboutOpen(false);
                                setIsProfileOpen(false);
                            }}
                            className="text-mtoko-light hover:text-mtoko-accent focus:outline-none"
                        >
                            <IoMenuOutline className="text-[24px]" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-[2.5rem] right-0 bg-gradient-to-br from-mtoko-primary via-mtoko-secondary to-mtoko-accent rounded-[8px] p-[8px] grid gap-[4px] min-w-[150px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transform transition-[transform,opacity] duration-300 ease-in-out translate-y-0 opacity-100 pointer-events-auto">
                                <div className="absolute -top-[6px] right-[10px] w-[10px] h-[10px] bg-mtoko-primary border-t border-l border-mtoko-dark rotate-45"></div>
                                <Link
                                    href="/category/food"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoFastFoodOutline className="text-[16px]" />
                                    <span>Food</span>
                                </Link>
                                <Link
                                    href="/category/family"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoPeopleOutline className="text-[16px]" />
                                    <span>Family & Kids</span>
                                </Link>
                                <Link
                                    href="/category/nightlife"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoMoonOutline className="text-[16px]" />
                                    <span>Night Life</span>
                                </Link>
                                <Link
                                    href="/category/events"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoCalendarOutline className="text-[16px]" />
                                    <span>Events</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* About Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsAboutOpen(!isAboutOpen);
                                setIsMenuOpen(false);
                                setIsProfileOpen(false);
                            }}
                            className="text-mtoko-light hover:text-mtoko-accent focus:outline-none"
                        >
                            <IoInformationCircleOutline className="text-[24px]" />
                        </button>
                        {isAboutOpen && (
                            <div className="absolute top-[2.5rem] right-0 bg-gradient-to-br from-mtoko-primary via-mtoko-secondary to-mtoko-accent rounded-[8px] p-[8px] grid gap-[4px] min-w-[150px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transform transition-[transform,opacity] duration-300 ease-in-out translate-y-0 opacity-100 pointer-events-auto">
                                <div className="absolute -top-[6px] right-[10px] w-[10px] h-[10px] bg-mtoko-primary border-t border-l border-mtoko-dark rotate-45"></div>
                                <Link
                                    href="/about"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoInformationOutline className="text-[16px]" />
                                    <span>About Mtoko</span>
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoMailOutline className="text-[16px]" />
                                    <span>Contact Us</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsProfileOpen(!isProfileOpen);
                                setIsMenuOpen(false);
                                setIsAboutOpen(false);
                            }}
                            className="text-mtoko-light hover:text-mtoko-accent focus:outline-none"
                        >
                            <img
                                src="/profile-placeholder.png"
                                alt="Profile"
                                className="w-[24px] h-[24px] rounded-full"
                            />
                        </button>
                        {isProfileOpen && (
                            <div className="absolute top-[2.5rem] right-0 bg-gradient-to-br from-mtoko-primary via-mtoko-secondary to-mtoko-accent rounded-[8px] p-[8px] grid gap-[4px] min-w-[150px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transform transition-[transform,opacity] duration-300 ease-in-out translate-y-0 opacity-100 pointer-events-auto">
                                <div className="absolute -top-[6px] right-[10px] w-[10px] h-[10px] bg-mtoko-primary border-t border-l border-mtoko-dark rotate-45"></div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoPersonOutline className="text-[16px]" />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    href="/group-chats"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoChatbubblesOutline className="text-[16px]" />
                                    <span>Group Chats</span>
                                </Link>
                                <Link
                                    href="/saved"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoBookmarkOutline className="text-[16px]" />
                                    <span>Saved</span>
                                </Link>
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoSettingsOutline className="text-[16px]" />
                                    <span>Settings</span>
                                </Link>
                                <Link
                                    href="/logout"
                                    className="flex items-center gap-[10px] px-[12px] py-[8px] text-mtoko-light text-[14px] font-normal rounded-[4px] hover:bg-mtoko-dark/50 hover:scale-105 transition-transform"
                                >
                                    <IoLogOutOutline className="text-[16px]" />
                                    <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}