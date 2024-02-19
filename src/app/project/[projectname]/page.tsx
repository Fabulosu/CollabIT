import { ProjectModel } from "@/lib/dbModels";

export default async function ProjectPage({ params }: { params: { projectname: String } }) {

    let projectName = (params.projectname).replaceAll("-", " ").replaceAll("%20", " ").toLowerCase();

    // console.log(projectName)

    const project = await ProjectModel.findOne({ project_name: { $regex: projectName, $options: "i" } });

    // console.log("Params: ", params.projectname);

    if (project) {
        return (
            <div>
                <h1>{project.project_name + " | " + project.project_description + " | " + project.project_techstack + " | " + project.project_link}</h1>
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
