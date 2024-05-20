// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) return null;
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (user && user.password && await bcrypt.compare(credentials.password, user.password)) {
                    const { password, ...userWithoutPassword } = user;
                    return { ...userWithoutPassword, id: String(user.id) };
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            console.log("Session callback", { session, token });
            if (token && session.user) {
                session.userId = token.sub ?? '';
                session.user.id = token.sub ?? '';
            }
            return session;
        },
        async jwt({ token, user }: { token: any, user: any }) {
            console.log("JWT callback", { token, user });
            if (user) {
                token.sub = user.id as string;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
