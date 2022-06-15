import { PrismaClient } from '@prisma/client';
import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';

export default nextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'test@gmail.com',
        },
        password: { label: '패스워드', type: 'password' },
      },

      //인증 부분
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        //프리즈마 연결
        let prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
          select: { name: true, email: true, password: true },
        });
        if (!user) {
          throw new Error('No user found');
        }

        const isValid = await verifyPassword(
          String(credentials?.password),
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        return { name: user.name, email: user.email };
      },
    }),
  ],
  secret: process.env.SECRET,
});
