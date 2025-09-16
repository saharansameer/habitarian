import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Habitarian intro */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold">Your Go To Habit Tracker</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Habitarian is your go to habit trackers which helps you stay
              motivated and accountable.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Glimpses of Habitarian
            </h2>
            <p className="text-muted-foreground text-lg">
              Clean interfaces that focus on what matters, anyway who cares
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <div className="space-y-4">
              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/"
                  alt="Habit dashboard showing daily and weekly habits"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>
              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/"
                  alt="Social feed showing friend's habit completions"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4 md:pt-8">
              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/"
                  alt="Habit creation form with frequency options"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>
              <div className="rounded-xl border bg-background p-3 shadow-sm">
                <Image
                  src="/"
                  alt="Leaderboard showing streak comparisons"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genwin Talks */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Why we built this
              </h2>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <p className="text-muted-foreground">
                Genuinely speaking, we built this because we got an assigment to
                build a habit tracker. While building this habit tracker I
                realized that these kind of projects looks so generic from
                outside but they had some hidden complexities which you can only
                experience while building these kind of projects.
              </p>
              <p className="text-muted-foreground">
                I have some good full-stack project on my resume/portfolio, all
                of them are fully deployed and live. You chan check out them on
                my{" "}
                <Link
                  href={"https://sameersaharan.com"}
                  target="_blank"
                  className="text-foreground/80 hover:underline"
                >
                  portfolio website
                </Link>
                . But we aren&apos;t gonna talk more about those projects here, so
                lets continue with speaking of Habitarian - Your Go To Habit
                Tracker, which I built in just 2 days.
              </p>

              <p className="text-muted-foreground">
                There were clear instruction that project should be non-vibe
                coded and you can not use coding tools like v0 or lovable. So I
                followed the instructions very clearly and worked on this
                project tirelessly. I have used{" "}
                <Link
                  href={"https://better-auth.com"}
                  target="_blank"
                  className="text-foreground/80 hover:underline"
                >
                  better-auth
                </Link>{" "}
                library to handle authentication and{" "}
                <Link
                  href={"https://ui.shadcn.com"}
                  target="_blank"
                  className="text-foreground/80 hover:underline"
                >
                  shadcn
                </Link>{" "}
                for theme and components like input, button, label, etc, etc.
              </p>

              <p className="text-muted-foreground">
                If anyone has anykind of concern looking at this project UI or
                code, I can explain every single line of code that I have
                written.
              </p>

              <p className="text-muted-foreground">
                By the way here is public repository link:{" "}
                <Link
                  href={"https://github.com/saharansameer/habitarian"}
                  target="_blank"
                  className="text-foreground/80 hover:underline"
                >
                  Github
                </Link>
              </p>
              <div className="pt-4">
                <p className="font-medium text-foreground">
                  Built with modern tools you can trust:
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Next.js / PostgreSQL / Better-Auth / Tailwind CSS / shadcn
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build better habits?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join others who&apos;ve chosen simplicity over complexity. Start tracking
            what matters today.
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
