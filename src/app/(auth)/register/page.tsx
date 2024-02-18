"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

    const [errorMessage, setErrorMessage] = useState('');
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const cpassRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const { data: session, status } = useSession();

    if (session) return redirect('/explore');

    if (status === "loading") return <div className="font-bold text-white">Loading...</div>

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passRef.current?.value;
        const cpass = cpassRef.current?.value;

        if (username && email && password && cpass) {
            try {
                if (password.length >= 8) {
                    if (password === cpass) {
                        const response = await axios.post("/api/user/register", { username, email, password });

                        // console.log(response.data)
                        if (response.data.success) {
                            router.push('/login');
                        } else {
                            setErrorMessage(response.data.message);
                        }
                    } else {
                        setErrorMessage("Passwords do not match!");
                    }
                } else {
                    setErrorMessage("The password must be at least 8 characters!");
                }

            } catch (error) {
                console.error('Error creating account:', error);
            }

        }
    }
    return (
        <div className="bg-neutral-900 flex items-center justify-center h-screen w-screen">
            <form onSubmit={onSubmit} className="w-3/12 h-1/2 bg-neutral-800 flex items-center justify-center flex-col">
                <h1 className="font-bold text-2xl text-white">CREATE AN ACCOUNT</h1>
                <hr className="w-full mt-6 border-2 border-neutral-900" />
                <Input type="text" name="username" placeholder="Username" className="w-2/3 mt-14" ref={usernameRef} required={true}></Input>
                <Input type="email" name="email" placeholder="Email" className="w-2/3 mt-5" ref={emailRef}></Input>
                <Input type="password" name="password" placeholder="Password" className="w-2/3 mt-5" ref={passRef}></Input>
                <Input type="password" name="cpassword" placeholder="Confirm your password" className="w-2/3 mt-5" ref={cpassRef}></Input>
                {errorMessage && <p className="text-red-600 mt-4 -mb-4 font-bold">{errorMessage}</p>}
                <Button type="submit" variant="success" className="w-40 mt-10">REGISTER</Button>
            </form>
        </div >
    );
}