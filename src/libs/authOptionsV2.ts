import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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
                const res = await fetch(`http://localhost:1919/api/v1/user/login-v2`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return null;
                }
                const { _id, name, email: mail, avatar } = data.user;
                const userInformation = {
                    id: _id,
                    name,
                    email: mail,
                    image: avatar,
                    accessToken: data.token,
                    refreshToken: data.refreshToken,
                };
                return userInformation;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            profile: async (profile, token) => {
                if (profile) {
                    try {
                        const res = await fetch(`http://localhost:1919/api/v1/user/login-google`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: profile.sub,
                                email: profile.email,
                                name: profile.name,
                                avatar: profile.picture,
                            }),
                        });
                        const data = await res.json();
                        if (data.status !== 200) {
                            return { id: profile.sub, error: data.message };
                        }
                        const { _id, name, email, avatar } = data.user;
                        return {
                            id: _id,
                            name,
                            email,
                            image: avatar,
                            accessToken: data.token,
                            refreshToken: data.refreshToken,
                        };
                    } catch (error: any) {
                        return { id: profile.sub, error: error.message };
                    }
                } else {
                    throw new Error('Login Failed');
                }
            },
        }),
    ],
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
                }
            }
            if (account?.provider === 'google') {
                if (user) {
                    token.accessToken = (user as any).accessToken;
                    token.refreshToken = (user as any).refreshToken;
                    token.id = (user as any).id;
                    token.type = 'google';
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
            }
            if (token.type === 'google') {
                (session as any).accessToken = token.accessToken;
                (session as any).refreshToken = token.refreshToken;
                (session as any).user.id = token.id;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                if ((user as any)?.error) {
                    return `/login?error=${(user as any)?.error}`;
                }
                return true;
            }
            return true;
        },
    },
    pages: {
        signIn: '/login',
    },
};
