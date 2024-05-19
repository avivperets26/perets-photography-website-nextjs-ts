import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // Adjust the import path as needed


// console.log('Prisma in NextAuth:', prisma);
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
export const authOptions: AuthOptions = {
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

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    const { password, ...userWithoutPassword } = user;
                    return { ...userWithoutPassword, id: String(user.id) };
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
