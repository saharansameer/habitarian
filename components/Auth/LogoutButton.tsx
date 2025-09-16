"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";

export function LogoutButton() {
  const router = useRouter();
  const onSignOutHandler = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    router.push("/sign-in");
    router.refresh();
  };
  return (
    <Button
      variant="default"
      onClick={onSignOutHandler}
      className="min-w-full min-h-full font-semibold cursor-pointer px-4 py-2"
    >
      Sign out
    </Button>
  );
}
