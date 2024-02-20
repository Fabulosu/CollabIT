import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: Object;
            username: string;
            email: string;
            name: string;
            avatar: string;
        }
    }
}