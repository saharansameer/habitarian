import { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/types";
import { getAuthSession, unauthorized } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { follows, authSchema } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { trimAndClean } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const session = await getAuthSession(request.headers);

  if (!session) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const username = trimAndClean(String(body?.username || ""));

    if (!username) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Username is required" },
        { status: 400 }
      );
    }

    // Find target user by username
    const [targetUser] = await db
      .select({ id: authSchema.user.id, name: authSchema.user.name })
      .from(authSchema.user)
      .where(eq(authSchema.user.name, username))
      .limit(1);

    if (!targetUser) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Prevent self follow
    if (targetUser.id === session.userId) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    // Check if already following
    const existingFollow = await db.query.follows.findFirst({
      where: and(
        eq(follows.follower, session.userId),
        eq(follows.followee, targetUser.id)
      ),
      columns: { id: true },
    });

    if (existingFollow) {
      // Unfollow
      await db.delete(follows).where(eq(follows.id, existingFollow.id));

      return NextResponse.json<BaseResponse>(
        { success: true, message: "Unfollowed" },
        { status: 200 }
      );
    }

    // Follow
    const [newFollow] = await db
      .insert(follows)
      .values({ followee: targetUser.id, follower: session.userId })
      .returning();

    if (!newFollow) {
      return NextResponse.json<BaseResponse>(
        { success: false, message: "Failed to follow user" },
        { status: 400 }
      );
    }

    return NextResponse.json<BaseResponse>(
      { success: true, message: "Followed" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<BaseResponse>(
      { success: false, message: "Failed to toggle follow" },
      { status: 500 }
    );
  }
}
