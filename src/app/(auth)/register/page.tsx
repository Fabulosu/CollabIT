import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {

    const session = await getServerSession(authConfig);

    console.log("Session: ", session);

    if (session) return redirect("/explore");

    return (
        <div className="flex flex-col items-center mt-10 p-10 shadow-md bg-neutral-800">
            <h1 className="mt-10 mb-4 text-4xl font-bold text-white">Register</h1>
            <Input placeholder="youremail@email.com" /><br></br>
            <Input placeholder="password" />
            <Button>Register</Button>
        </div>
    );
}
