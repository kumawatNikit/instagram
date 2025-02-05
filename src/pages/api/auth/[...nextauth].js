
import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export default NextAuth({
  providers: [
    InstagramProvider({
      clientId: "967203745507226",
      clientSecret: "da85fe73f6e7241dac0da2835149aa18",
    }),
  ],
  debug: true, // Enable detailed logging
});
