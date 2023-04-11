import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { fetchApi } from "../../util/fetchData";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const res = await fetchApi(`${process.env.API_URL}/users/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (res) {
          return res;
        } else return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
};

export default NextAuth(authOptions);

