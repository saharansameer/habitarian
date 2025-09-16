"use client";

import { Button, Input } from "@/components/ui";
import { ErrorMessage, LoaderSpin } from "@/components/index";
import { useForm, type SubmitHandler } from "react-hook-form";
import { followSchema, FollowInputs } from "@/zod/schema/follow.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function FollowForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    reset,
  } = useForm<FollowInputs>({
    resolver: zodResolver(followSchema),
    mode: "onSubmit",
    defaultValues: { username: "" },
  });

  const onSubmit: SubmitHandler<FollowInputs> = async (formData) => {
    const toastId = toast.loading("Searching user...");
    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const { success, message } = await res.json();

      if (success) {
        toast.success(message, { id: toastId });
        reset();
      } else {
        setError("username", { type: "validate", message });
        toast.error(message, { id: toastId });
      }
    } catch {
      setError("username", {
        type: "validate",
        message: "Failed to search user",
      });
      toast.error("Failed to search user", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-0">
      <div className="w-full flex items-center gap-2">
        <Input
          className="w-full"
          id="username"
          type="text"
          placeholder="Enter username"
          {...register("username")}
          onChange={(e) =>
            setValue("username", e.target.value.replace(/[^A-Za-z0-9]/g, ""), {
              shouldValidate: false,
            })
          }
        />
        <Button
          type="submit"
          className="font-semibold w-full max-w-40 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderSpin /> : "Follow / Unfollow"}
        </Button>
      </div>

      {errors.username && (
        <ErrorMessage message={errors.username.message as string} />
      )}
    </form>
  );
}
