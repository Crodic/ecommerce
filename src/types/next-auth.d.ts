import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            type?: string;
            role: string;
        };
        accessToken: string;
        refreshToken: string;
    }
}
