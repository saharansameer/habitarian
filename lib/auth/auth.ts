import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as authSchema from "@/lib/db/auth-schema";
import { nextCookies } from "better-auth/next-js";
import { addToUsersTable } from "./hooks";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  plugins: [nextCookies()],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    freshAge: 0, // disabled
    cookieCache: {
      enabled: true,
      maxAge: 60 * 15, // 15 minutes
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await addToUsersTable(user.id);
        },
      },
    },
  },
});
