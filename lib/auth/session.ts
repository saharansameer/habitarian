import { auth } from "@/lib/auth/auth";
import { Session } from "better-auth";
import { NextResponse } from "next/server";
import { BaseResponse } from "@/types";

export async function getAuthSession(
  headers: Headers
): Promise<Session | null> {
  const authSession = await auth.api.getSession({
    headers,
  });

  if (!authSession) return null;

  return authSession.session as Session;
}

export function unauthorized() {
  return NextResponse.json<BaseResponse>(
    { success: false, message: "Please Sign-in and try again" },
    { status: 401 }
  );
}
