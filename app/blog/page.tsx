import Link from "next/link";

export default function HabitarianBlog() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Habitarian Blog</h1>
        <p className="mb-2 text-foreground/80">
          I recently built a habit tacker project named Habitarian. In this blog
          you&apos;ll learn about the approach I followed, challenges I faced,
          and what improvements can be made to make this a good product.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">The Approach</h2>
        <p className="text-foreground/80">
          The first task was to decide the tech stack. I didn&apos;t think long,
          after reading the assignment description I decided to use Next.js
          because the deadline to build and ship this project was 3 days and
          every smart developer will choose either Next.js or Nuxt.js. Because
          Next.js is a fullstack framework and offers everything out of the box
          that we need.
        </p>
        <p className="text-foreground/80">
          Considering the deadline, building my own custom authentication system
          would have taken a lot of time, so I chose to go with{" "}
          <Link
            href="https://better-auth.com"
            target="_blank"
            className="text-foreground hover:underline"
          >
            better-auth&#x1F855;
          </Link>
          . Better-Auth is an authentication library with full TypeScript
          support. I also used{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            className="text-foreground hover:underline"
          >
            shadcn/ui&#x1F855;
          </Link>{" "}
          for components and the overall theme of the project, because creating
          my own buttons and inputs would have also consumed time.
        </p>
        <p className="text-foreground/80">
          For the database, I chose PostgreSQL with Drizzle ORM and Neon.
          Setting up the project was smooth because I&apos;m familiar with this
          tech stack and had built and shipped some full stack projects before.
          After setting up the project, I wrote schemas, then
          worked on auth logic. Yeah, I was using Better-Auth, but it
          doesn&apos;t give everything out of the box, we have to create a
          proper setup. Then I worked on API endpoints (backend part) and
          working on the client was smooth. I created forms, fetched data,
          displayed it, and it was done.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold">Challenges</h2>
        <p className="text-foreground/80">
          There were two challenges I faced, one while building it and another
          while deploying it. In habit trackers, the biggest culprit is
          timezone. Databases store timestamps according to UTC timezone.
          Keeping UTC as the only timezone could cause issues. Suppose you set a
          habit to go for a morning walk, did the walk, and when you visit the
          webpage to mark it as completed, it may show already completed because
          in UTC the next day hasn&apos;t came yet. It took some time to figure
          out how to handle timezones, but thanks to JavaScript, the logic was
          smooth.
        </p>
        <p className="text-foreground/80">
          I faced some issues while deploying because Vercel has something
          called Turbopack. I was mistakenly using it with the production build,
          which caused bugs and images in the public folder weren&apos;t showing
          on the webpage. Because turbopack for production build is currently in
          beta, there is no stable version.
        </p>
        <p className="text-foreground/80">
          One thing I realized while building this is that projects like these
          seem so generic from the outside, but they have their own complexities
          that you can only experience while building them.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Improvements</h2>
        <p className="text-foreground/80">
          There are a lot of improvements that can be made. I focused only on
          what was mentioned in the assignment. In authentication, currently we
          have sign in, sign up, and sign out. But features like email
          verification, password reset/change, email/username change, viewing
          account details, and account deletion could be implemented.
        </p>
        <p className="text-foreground/80">
          Shareable habits: a group of friends can have the same habit and a
          separate activity feed for every shared habit, which helps keep
          everyone motivated. Currently, a user can only follow/unfollow by
          entering a username. We can show profiles of people they follow,
          introduce private/public profiles, and make habits public or private.
          A profile page could show user activity (something like Github
          activity graph).
        </p>
        <p className="text-foreground/80">
          UI and UX need improvements. I created a basic UI but fully
          responsive. Currently, I&apos;m using a moving loading icon for
          suspense fallback. For better UX, skeletons could be used while
          fetching data asynchronously.
        </p>

        <p className="text-foreground/80">
          Currently, data is fetched directly from the database on every
          request. This can increase costs and slow down the app as it scales,
          since each database call has a cost. To improve performance, reduce
          delays, and lower costs, data can be stored in an in-memory cache
          using tools like Redis. Rate limiting can also be implemented to
          prevent spam or automated requests from bots.
        </p>
      </section>
    </main>
  );
}
