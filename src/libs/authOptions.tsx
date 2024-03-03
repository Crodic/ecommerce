import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'johnsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (credentials) {
                    const res = {
                        _id: 1284362,
                        email: 'alice01422@gmail.com',
                        role: 'USER',
                        avatar: 'https://source.unsplash.com/random/100×100',
                        name: 'Crodic Crystal',
                    };
                    return res as any;
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            profile: (profile, tokens) => {
                if (profile) {
                    return {
                        id: profile.sub,
                        name: profile.firstName,
                        lastName: profile.family_name,
                        firstName: profile.given_name,
                        image: profile.picture,
                    };
                } else {
                    throw new Error('Login Failed');
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            const sessionInfo = {
                user: {
                    id: token.id,
                    username: token.username,
                    email: token.email,
                    name: `${token.firstName} ${token.lastName}`,
                    image: token.image,
                },
                expires: session.expires,
                accessToken: token.token,
            };

            return sessionInfo as Session;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                return { ...token, ...user };
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
    },
};
