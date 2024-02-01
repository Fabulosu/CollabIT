import { Schema, model, models } from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const userSchema = new Schema({
    username: reqString,
    password: reqString,
    email: reqString,
    name: String,
    date_of_birth: String,
    country: String,
    timezone: String,
    github_acc: String,
    gitlab_acc: String,
    twitter_acc: String
});

const projectSchema = new Schema({
    project_name: reqString,
    project_description: reqString,
    project_owner: Object,
    project_link: reqString,
    project_techstack: Array,
    project_contributors: Array
});

const UserModel = models.users || model("users", userSchema);
const ProjectModel = models.projects || model("projects", projectSchema)

export { UserModel, ProjectModel };