"use client";

import { Button, Input, Label } from "@/components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ErrorMessage, LoaderSpin } from "@/components/index";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema, HabitInputs } from "@/zod/schema/habit.schema";
import { habitCategories, habitFrequencies } from "@/lib/constants";
import { HabitCategory, HabitFrequency } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface HabitFormProps {
  mode: "POST" | "PATCH";
  habit?: {
    id: string;
    title: string;
    category: HabitCategory;
    frequency: HabitCategory;
  };
}

export function HabitForm({ mode, habit }: HabitFormProps) {
  const isPostMethod = mode === "POST";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm<HabitInputs>({
    resolver: zodResolver(habitSchema),
    mode: "onSubmit",
    defaultValues: isPostMethod
      ? { title: "", category: "GENERAL", frequency: "DAILY" }
      : {
          title: habit?.title,
          category: habit?.category as HabitCategory,
          frequency: habit?.frequency as HabitFrequency,
        },
  });

  const onSubmit: SubmitHandler<HabitInputs> = async (formData) => {
    try {
      const { title, category, frequency } = formData;

      const response = await fetch(
        isPostMethod ? "/api/habit/create" : `/api/habit/${habit?.id}/update`,
        {
          method: isPostMethod ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, category, frequency }),
        }
      );

      const { success, message } = await response.json();

      if (!success) {
        setError("root", { type: "validate", message: message });
        toast.error(message);
        return;
      }

      toast.success(message);
      router.push("/habits");
      router.refresh();
    } catch {
      setError("root", { type: "validate", message: "Something went wrong" });
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-xl space-y-5">
      {errors.root && (
        <ErrorMessage
          message={errors.root.message as string}
          className="pb-0.5"
        />
      )}

      <div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter habit title"
            {...register("title")}
          />
        </div>
        {errors.title && (
          <ErrorMessage message={errors.title.message as string} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <>
              <Label>Category</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {habitCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />
        {errors.category && (
          <ErrorMessage message={errors.category.message as string} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="frequency"
          render={({ field }) => (
            <>
              <Label>Frequency</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {habitFrequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />
        {errors.frequency && (
          <ErrorMessage message={errors.frequency.message as string} />
        )}
      </div>

      <Button
        type="submit"
        size={"sm"}
        className="font-semibold w-full cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderSpin />
        ) : isPostMethod ? (
          "Create Habit"
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
