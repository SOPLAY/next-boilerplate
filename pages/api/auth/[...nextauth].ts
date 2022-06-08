import nextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default nextAuth({
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: '이메일, 패스워드 방식',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        useremail: {
          label: '이메일',
          type: 'email',
          placeholder: 'test@gmail.com',
        },
        password: { label: '패스워드', type: 'password' },
      },

      //인증 부분
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

        if (
          credentials?.useremail === 'test@gmail.com' &&
          credentials.password === '1q2w3e4r!'
        ) {
          const user = { id: 1, name: 'test', email: credentials.useremail };
          // Any object returned will be saved in `user` property of the JWT

          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process.env.SECRET,
});
