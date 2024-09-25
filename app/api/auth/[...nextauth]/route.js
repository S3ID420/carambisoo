import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with the email');
        }
        const isMatch =  credentials.password === user.password;
        if (!isMatch) {
          throw new Error('Invalid password');
        }
        return { id: user._id, email: user.email, username: user.username };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as POST, handler as GET };
