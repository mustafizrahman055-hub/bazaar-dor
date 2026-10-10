import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Add your database adapter here (e.g. Prisma, Drizzle, etc.)
  // database: prismaAdapter(prisma, { provider: "postgresql" }),
  
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
