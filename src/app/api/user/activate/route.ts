import { dbConnect } from "@/lib/database"
import { UserModel } from "@/lib/dbModels";
import { NextResponse, userAgent } from "next/server";

export async function PUT(req: Request, res: NextResponse) {
    const { uuid, email } = await req.json();
    await dbConnect();
    const user = await UserModel.findOne({ $and: [{ email }, { uuid }] });
    if (!user) {
        return NextResponse.json({ success: false, message: "An error occured!" }, { status: 500 });
    } else {
        if (user.activated == 1) {
            return NextResponse.json({ success: false, message: "Your account has been already activated!" }, { status: 200 })
        } else {
            await UserModel.updateOne({ uuid: uuid }, { activated: 1 });
            return NextResponse.json({ success: true, message: "Your account has been activated!\nYou will be redirected in 5 seconds!" }, { status: 200 })
        }
    }

}