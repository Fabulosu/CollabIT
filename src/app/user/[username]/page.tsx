import { UserModel } from "@/lib/dbModels";

export default async function UserPage({ params }: { params: { username: String } }) {

    const user = await UserModel.findOne({ username: params.username });

    console.log("Params: ", params.username);

    if (user) {
        return (
            <div>
                <h1>{user.username + " | " + user.email + " | " + user.name + " | " + user.techstack}</h1>
            </div>
        );
    } else {
        return (
            <div className="bg-red-900 flex items-center justify-center h-screen">
                <h1 className="font-bold font-sans text-white">User not found!</h1>
            </div>
        );
    }


}
