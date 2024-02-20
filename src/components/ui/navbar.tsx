"use client";
import { useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {

    const { data: session, status } = useSession();

    return (
        <nav className="bg-neutral-900 flex justify-around top-0 sticky overflow-hidden items-center pt-2 pb-2 h-16 border-b-2 border-b-neutral-800">
            <a href="/"><img src="CollabIT.png" width={50} className="rounded-full" /></a>
            {status === 'authenticated' && session && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="border-none outline-none">
                        <div className="flex items-center hover:bg-neutral-800 p-1 transition-all cursor-pointer rounded-sm">
                            <h2 className="text-white font-bold text-xl">{session.user.username}</h2>
                            <img className="rounded-full ml-3" width={40} src={session.user.avatar ? session.user.avatar : "https://i.imgur.com/qV84j5Z.png"} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <a href={`/user/` + session.user.username}><DropdownMenuItem>Profile</DropdownMenuItem></a>
                        <DropdownMenuItem>Your Projects</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <a href="/api/auth/signout"><DropdownMenuItem>Log Out</DropdownMenuItem></a>
                    </DropdownMenuContent>
                </DropdownMenu>

            )}
            {status === 'unauthenticated' && (
                <div>
                    <a href="/login" className="text-white font-bold text-xl">LOGIN</a>
                    <a href="/register" className="text-white font-bold text-xl ml-5 bg-orange-500 p-1.5 rounded-lg hover:text-orange-500 hover:bg-neutral-800 transition-all">SIGN UP</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;