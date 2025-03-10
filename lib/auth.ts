// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { prisma } from '@/lib/db';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {

          return null;
        }
        
        try {
          // For simplified development, add a hardcoded admin user
          const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
          const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
          
          if (
            credentials.email === adminUsername && 
            credentials.password === adminPassword
          ) {

            return {
              id: "admin-user",
              name: "Admin User",
              email: credentials.email,
              role: "admin"
            };
          }
          
          // Check database for other users
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          
          if (!user) {

            return null;
          }
          
          // For users in database, compare password
          const passwordMatch = await compare(credentials.password, user.password);
          if (!passwordMatch) {

            return null;
          }
          

          return user;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role || 'user';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'user';
      }
      return token;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };