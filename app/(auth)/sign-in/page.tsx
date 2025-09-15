import { SigninForm } from "@/components/Auth/SigninForm";
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
  title: "Sign in | Habitarian",
};

export default function SigninPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials below to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          <SigninForm />
          <Separator orientation="horizontal" />
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-center gap-x-2 text-sm font-semibold">
            <span>Don&apos;t have an account?</span>
            <Link
              href={"/sign-up"}
              className="hover:underline underline-offset-1 text-primary 
              transition-all ease-initial duration-200"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
