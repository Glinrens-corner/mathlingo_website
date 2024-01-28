import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import type {NextAuthConfig} from "next-auth"


export const config = {
    
    providers:[
	GitHubProvider({
	    clientId:process.env.GITHUB_ID,
	    clientSecret:process.env.GITHUB_SECRET
	})],
    secret:process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(
    config
)

export { handler as GET, handler as POST };
