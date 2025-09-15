import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function addToUsersTable(betterAuthUserId: string) {
  await db
    .insert(users)
    .values({
      betterAuthUserId,
    })
    .returning();
}
