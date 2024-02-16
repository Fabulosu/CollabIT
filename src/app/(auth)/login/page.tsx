"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRef } from "react";

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
}

export default function LoginPage(props: Props) {

    const email = useRef("");
    const pass = useRef("");

    const { data: session, status } = useSession();

    if (session) return redirect('/explore');

    if (status === "loading") return <div>Loading...</div>

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            email: email.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "http://localhost:3000/explore"
        })
    }
    return (
        <div className="bg-neutral-900 flex items-center justify-center h-screen w-screen">
            <form onSubmit={onSubmit} className="w-3/12 h-1/2 bg-neutral-800 flex items-center justify-center flex-col">
                <h1 className="font-bold text-3xl text-white">LOGIN</h1>
                <Input type="email" name="email" placeholder="Email" className="w-2/3 mt-20" onChange={(e) => (email.current = e.target.value)}></Input>
                <Input type="password" name="password" placeholder="Password" className="w-2/3 mt-5" onChange={(e) => (pass.current = e.target.value)}></Input>
                {!!props.searchParams?.error && <p className="text-red-600">Authentication failed!</p>}
                <Button type="submit" variant="success" className="w-40 mt-20">Login</Button>
            </form>
        </div >
    );
}
