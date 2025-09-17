import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-6xl font-bold">
              Your Go To Habit Tracker
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Habitarian is your go-to habit tracker, helping you stay
              motivated, build consistency, and stay accountable to your goals
              every day.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-1">
              Glimpses of Habitarian
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Clean interfaces that focus on what matters, anyway who cares
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <div className="space-y-4">
              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/assets/dashboard.png"
                  alt="Habit dashboard showing daily and weekly habits"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>
              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/assets/leaderboard.png"
                  alt="Leaderboard showing streak comparisons"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4 md:pt-8">
              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/assets/newhabit.png"
                  alt="Habit creation form with frequency options"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>

              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/assets/feed.png"
                  alt="Social feed showing friend's habit completions"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Ready to build better habits?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join others who&apos;ve chosen simplicity over complexity. Start
            tracking what matters today.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="w-full max-w-xs cursor-pointer">
              Get started for free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
