"use client";

import { Button, Input, Label } from "@/components/ui";
import { PasswordInput, ErrorMessage, LoaderSpin } from "@/components/index"
import { useForm, SubmitHandler } from "react-hook-form";
import {
  signinSchema,
  SigninSchemaInputs,
} from "@/zod/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SigninForm() {
  const router = useRouter();

  // React Hook Form Configuration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SigninSchemaInputs>({
    resolver: zodResolver(signinSchema),
    mode: "onSubmit",
  });

  // SignIn Handler
  const onSignInHandler: SubmitHandler<SigninSchemaInputs> = async (
    formData
  ) => {
    try {
      const { email, password } = formData;
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error?.code) {
        setError("root", {
          type: "validate",
          message: error.message,
        });
        return;
      }

      toast.success("Signed In");
      router.push("/habits");
      router.refresh();
    } catch {
      toast.error("Sign-in Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignInHandler)} className="w-full space-y-5">
      {errors.root && (
        <ErrorMessage
          message={errors.root.message as string}
          className="pb-0.5"
        />
      )}

      <div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <ErrorMessage message={errors.email.message as string} />
        )}
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput {...register("password")} id="password" />
        </div>

        {errors.password && (
          <ErrorMessage message={errors.password.message as string} />
        )}
      </div>

      <Button
        type="submit"
        size={"sm"}
        className="font-semibold w-full cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoaderSpin /> : "Sign in"}
      </Button>
    </form>
  );
}
