import { Schema, model } from 'mongoose';

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

const User = model("Users", userSchema, "users");

export { User };