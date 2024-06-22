import NextAuth from "next-auth/next";
import githubAuth from "next-auth/providers/github"
import prisma from "@/services/prisma";
import GoogleProvider from "next-auth/providers/google"

export const authOption = {
    providers: [
        githubAuth({
            clientId: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            const email = user.email;
            const username = profile.name;

            // Save user to database if doesn't exist
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email,
                        username
                    }
                });
            }

            return true;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }