import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: Object;
            username: String;
            email: String;
            name: String;
        }
    }
}