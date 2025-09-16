"use client";

import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { HabitListItem } from "@/types";
import {
  ClockFading,
  CircleCheckBig,
  Trash2,
  Pencil,
  DiamondPlus
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

interface HabitCardProps {
  habit: HabitListItem;
  onCompleted?: () => void;
}

export function HabitCard({ habit }: HabitCardProps) {
  const disableComplete = habit.completed;

  const onMarkComplete = async () => {
    try {
      const res = await fetch(`/api/habit/${habit.id}/mark-complete`, {
        method: "POST",
      });
      const { success, message } = await res.json();
      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDeleteHandler = async () => {
    try {
      const res = await fetch(`/api/habit/${habit.id}/delete`, {
        method: "DELETE",
      });
      const { success, message } = await res.json();
      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full rounded-lg border p-[10px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-foreground/80">
            {habit.category}
          </Badge>
          <Badge variant="secondary" className="text-foreground/80">
            {habit.frequency}
          </Badge>
        </div>
        <div className="flex gap-x-2 items-center font-semibold text-muted-foreground border rounded-md px-2">
          <DiamondPlus className="w-5 h-5" />{" "}
          <span className="text-lg">{habit.streak}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold break-words mb-4 pl-1">
        {habit.title}
      </h3>

      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="space-x-2">
          <Link href={`/habits/${habit.id}`}>
            <Button
              variant={"outline"}
              className="cursor-pointer text-muted-foreground"
              size={"sm"}
            >
              <Pencil />
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"outline"}
                size={"sm"}
                title="Delete"
                className="cursor-pointer text-muted-foreground"
              >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Habit Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the habit. This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteHandler}
                  className="cursor-pointer"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Button
          size="sm"
          className="font-semibold space-x-2 cursor-pointer"
          onClick={onMarkComplete}
          disabled={disableComplete}
          variant={"outline"}
        >
          {habit.completed ? <CircleCheckBig /> : <ClockFading />}
          {habit.completed ? "Completed" : "Mark Complete"}
        </Button>
      </div>
    </div>
  );
}
