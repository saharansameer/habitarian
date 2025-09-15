"use client";

import { Button, Input, Label } from "@/components/ui";
import { PasswordInput, ErrorMessage, LoaderSpin } from "@/components/index";
import { useForm, SubmitHandler } from "react-hook-form";
import { signupSchema, SignupSchemaInputs } from "@/zod/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignupForm() {
  const router = useRouter();

  // React Hook Form Configuration
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<SignupSchemaInputs>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });

  // SignUp Handler
  const onSignUpHandler: SubmitHandler<SignupSchemaInputs> = async (
    formData
  ) => {
    try {
      const { username, email, password } = formData;

      const { error } = await authClient.signUp.email({
        email,
        password,
        name: username,
      });

      if (error?.code) {
        setError("root", {
          type: "validate",
          message: error.message,
        });
        return;
      }

      toast.success("User registered successfully");
      router.push("/sign-in");
    } catch {
      toast.error("Sign-up Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignUpHandler)} className="w-full space-y-5">
      {errors.root && (
        <ErrorMessage
          message={errors.root.message as string}
          className="pb-0.5"
        />
      )}

      <div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter a username"
            {...register("username")}
          />
        </div>

        {errors.username && (
          <ErrorMessage message={errors.username.message as string} />
        )}
      </div>

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
        disabled={isSubmitting || isSubmitSuccessful}
      >
        {isSubmitting || isSubmitSuccessful ? <LoaderSpin /> : "Sign up"}
      </Button>
    </form>
  );
}
