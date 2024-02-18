import { dbConnect } from "@/lib/database"
import { UserModel } from "@/lib/dbModels";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";


export async function POST(req: Request, res: NextResponse) {
    const { username, email, password } = await req.json();
    // console.log(`${username} | ${email} | ${password}`)

    await dbConnect();
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = new UserModel({
            username: username,
            email: email,
            password: hashedPass,
            activated: 0
        });
        // console.log(newUser);
        await newUser.save();
        return NextResponse.json({ success: true, message: "Account created successfully!" }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, message: "There is already an account with this username or email!" }, { status: 200 })
    }

}