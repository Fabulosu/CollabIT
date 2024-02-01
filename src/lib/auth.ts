import bcrypt from 'bcrypt';
import { dbConnect } from './database';
import { UserModel } from './dbModels';
import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import GitlabProvider from "next-auth/providers/gitlab";
// import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
    pages: {
        newUser: '/explore'
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;
                await dbConnect();
                const user = await UserModel.findOne({ email: credentials.email });

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return user
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user) {
                return true
            }
            return false
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url
            else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
            return baseUrl
        },
        async session({ session, token, user }) {
            if (token) {
                await dbConnect();
                const user = await UserModel.findOne({ email: session.user.email });
                session.user.username = user.username;
                session.user.id = user._id.toString();
            }
            return session
        },
    },
    debug: true,
};