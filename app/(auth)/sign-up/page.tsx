import { SignupForm } from "@/components/Auth/SignupForm";
import { Separator } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | Habitarian",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6 items-center">
          <SignupForm />
          <Separator orientation="horizontal" />
        </CardContent>
        <CardFooter className="flex flex-col gap-y-4">
          <div className="w-full flex justify-center gap-x-2 text-sm font-semibold">
            <span>Already have an account?</span>
            <Link
              href={"/sign-in"}
              className="hover:underline underline-offset-1 text-primary 
              transition-all ease-initial duration-200"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
