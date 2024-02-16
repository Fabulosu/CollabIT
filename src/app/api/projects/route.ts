import { dbConnect } from "@/lib/database"
import { ProjectModel } from "@/lib/dbModels";


export async function GET() {
    await dbConnect();
    const projects = await ProjectModel.find();

    return Response.json(projects)
}