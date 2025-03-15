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
          console.log("Missing credentials");
          return null;
        }
        
        try {
          // Log authentication attempt
          console.log(`Auth attempt for email: ${credentials.email}`);
          
          // For simplified development, add a hardcoded admin user
          const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
          const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
          
          console.log(`Admin username from env: ${adminUsername}`);
          // Never log the actual password, just check if it exists
          console.log(`Admin password exists: ${Boolean(adminPassword)}`);
          
          if (
            credentials.email === adminUsername && 
            credentials.password === adminPassword
          ) {
            console.log("Admin credentials matched");
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
            console.log("User not found in database");
            return null;
          }
          
          // For users in database, compare password
          const passwordMatch = await compare(credentials.password, user.password);
          if (!passwordMatch) {
            console.log("Password didn't match");
            return null;
          }
          
          console.log("Database user authentication successful");
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