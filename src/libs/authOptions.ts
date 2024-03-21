import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials: Record<'email' | 'password', string> | undefined): Promise<any> => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const email = credentials.email;
                const password = credentials.password;
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return { error: data.message, errorStatus: data.status };
                }
                const { _id, firstname, lastname, email: mail, role } = data.data.user;
                const userInformation = {
                    id: _id,
                    name: `${firstname} ${lastname}`,
                    email: mail,
                    role,
                    accessToken: data.data.access_token,
                    refreshToken: data.data.refresh_token,
                };
                return userInformation;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            profile: async (profile: GoogleProfile, token) => {
                if (profile) {
                    try {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                googleId: profile.sub,
                                email: profile.email,
                                firstname: profile.given_name || '',
                                lastname: profile.family_name || '',
                            }),
                        });
                        const data = await res.json();
                        if (data.status !== 200) {
                            return { id: profile.sub, error: data.message, errorStatus: data.status };
                        }
                        const { _id, firstname, lastname, email, role } = data.data.user;
                        return {
                            id: _id,
                            name: `${firstname} ${lastname}`,
                            email,
                            role,
                            accessToken: data.data.access_token,
                            refreshToken: data.data.refresh_token,
                        };
                    } catch (error: any) {
                        return { id: profile.sub, error: error.message, errorStatus: error?.status || 500 };
                    }
                } else {
                    throw new Error('Login Failed');
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt(params) {
            const { token, user, account, trigger, session } = params;
            // trigger is update when call update() function
            if (trigger === 'update') {
                const getToken = { ...token, accessToken: session.accessToken, refreshToken: session.refreshToken };
                return getToken;
            }
            if (account?.provider === 'credentials') {
                if (user) {
                    token.accessToken = (user as any).accessToken;
                    token.refreshToken = (user as any).refreshToken;
                    token.id = (user as any).id;
                    token.type = 'credentials';
                    token.role = (user as any).role;
                }
            }
            if (account?.provider === 'google') {
                if (user) {
                    token.accessToken = (user as any).accessToken;
                    token.refreshToken = (user as any).refreshToken;
                    token.id = (user as any).id;
                    token.type = 'google';
                    token.role = (user as any).role;
                }
            }
            return token;
        },
        async session(params) {
            const { session, token } = params;
            if (token.type === 'credentials') {
                (session as any).accessToken = token.accessToken;
                (session as any).refreshToken = token.refreshToken;
                (session as any).user.id = token.id;
                (session as any).user.role = token.role;
            }
            if (token.type === 'google') {
                (session as any).accessToken = token.accessToken;
                (session as any).refreshToken = token.refreshToken;
                (session as any).user.id = token.id;
                (session as any).user.role = token.role;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                if ((user as any)?.errorStatus) {
                    return `/login?error=${(user as any)?.errorStatus}`;
                }
                return true;
            }
            if (account?.provider === 'credentials') {
                if ((user as any)?.error) {
                    return `/login?error=${(user as any)?.error}`;
                }
                return true;
            }
            return true;
        },
    },
};
