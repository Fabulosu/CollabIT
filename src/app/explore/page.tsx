"use client"
import { useSession, getSession } from "next-auth/react"
// import { authConfig } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default function FeedPage() {

    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    // if (status === "unauthenticated") {
    //     return redirect("/login")
    // }

    // const session = await getServerSession(authConfig);

    console.log("Session: ", session);
    if (session) {
        return (
            <div className="bg-neutral-900 flex items-center justify-center h-screen">
                <h1 className="font-bold font-sans text-white">Welcome back, {session?.user?.name}!</h1>
            </div>
        );
    } else {
        return (
            <div className="bg-red-900 flex items-center justify-center h-screen">
                <h1 className="font-bold font-sans text-white">Not authorized!</h1>
            </div>
        );
    }

}
