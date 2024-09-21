import NextAuth, {type NextAuthConfig} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import HubspotProvider from "next-auth/providers/hubspot";
import prisma from "@/lib/prisma";
import {verifyPassword} from "@/lib/password";

// Define NextAuth configuration
const config: NextAuthConfig = {
    theme: {logo: "https://authjs.dev/img/logo-sm.png"},
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        HubspotProvider({
            clientId: process.env.HUBSPOT_CLIENT_ID!,
            clientSecret: process.env.HUBSPOT_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "you@example.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const {email, password} = credentials || {};

                if (!email || !password) {
                    throw new Error("Please provide both email and password.");
                }

                // Check if the user exists in the database
                const user = await prisma.user.findUnique({
                    where: {email},
                    include: {
                        accounts: true,
                    },
                });

                if (!user) {
                    throw new Error("No user found with the provided email.");
                }
                console.log("user", user)

                // Retrieve hashed password from the user's account
                const account = user.accounts.find((acc) => acc.provider === "local");

                if (!account) {
                    throw new Error("No credentials found for this account.");
                }

                // Verify the provided password against the stored hashed password
                const isValidPassword = await verifyPassword(password, account.access_token);

                if (!isValidPassword) {
                    throw new Error("Invalid credentials.");
                }

                // Return the user object on successful authorization
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    // basePath: "/auth",
    // callbacks: {
    //     async jwt({token, account, trigger, session}) {
    //         if (trigger === "update" && session?.user) {
    //             token.name = session.user.name;
    //         }
    //         if (account) {
    //             token.accessToken = account.access_token;
    //         }
    //         return token;
    //     },
    //     async session({session, token}) {
    //         if (token?.accessToken) {
    //             session.accessToken = token.accessToken;
    //         }
    //         return session;
    //     },
    // },
    // debug: process.env.NODE_ENV !== "production",
    // experimental: {
    //     enableWebAuthn: true,
    // },
    pages: {
        signIn: "/signin",
    },
};

// Export NextAuth configuration
export const {handlers, auth, signIn, signOut} = NextAuth(config);
//
// // Extend the NextAuth session and JWT types for accessToken
// declare module "next-auth" {
//     interface Session {
//         accessToken?: string;
//     }
// }
//
// declare module "next-auth/jwt" {
//     interface JWT {
//         accessToken?: string;
//     }
// }

// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "./lib/prisma";
//
// const options = {
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Credentials",
//             async authorize(credentials, req) {
//                 const userCredentials = {
//                     email: credentials.email,
//                     password: credentials.password,
//                 };
//
//                 const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
//                     {
//                         method: "POST",
//                         body: JSON.stringify(userCredentials),
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 );
//                 const user = await res.json();
//
//                 if (res.ok && user) {
//                     return user;
//                 } else {
//                     return null;
//                 }
//             },
//         }),
//     ],
//
//     adapter: PrismaAdapter(prisma),
//     secret: process.env.NEXTAUTH_SECRET,
//     session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
//
//     jwt: {
//         secret: process.env.NEXTAUTH_SECRET,
//         maxAge: 60 * 60 * 24 * 30,
//         encryption: true,
//     },
//
//     pages: {
//         signIn: "/login",
//         signOut: "/login",
//         error: "/login",
//     },
//
//     callbacks: {
//         async session(session, user, token) {
//             if (user !== null) {
//
//                 session.user = user;
//             }
//             return await session;
//         },
//
//         async jwt({ token, user }) {
//             return await token;
//         },
//     },
// };

// export default const { handlers, auth, signIn, signOut } = NextAuth(options);