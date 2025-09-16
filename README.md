# Habitarian

Habitarian is a web app to track habits. Users can create and manage habits, keep streaks for accountability, follow friends to see their activity, and check a global leaderboard to compare ranks.

---

## Tech Stack
- **Next.js**
- **TypeScript**
- **PostgreSQL**
- **Drizzle ORM**
- **Better-Auth**
- **Tailwind CSS**
- **shadcn/ui**

---

## Features
- **Authentication:** Users can Sign in, Sign up and Sign out
- **Habits:** Create new habits, view existing ones, update habit details and delete habits
- **Feed:** Can follow other users and see their habit completion activity
- **Leaderboard:** Ranks users by streaks and active habits.
- **Frequency:** Assign a frequency to each habit as daily or weekly. Daily habits reset each day, weekly habits reset every week.
- **Category:** Categories can be assigned to habits and are displayed on the habits dashboard for easy organization.

---

## Environment Variables
All required environment variables and notes are included in `.env.example`. Copy it and adjust values for your environment.

```bash
cp .env.example .env
```

---

## Local Setup

Prerequisites:
- [Node.js v20+](https://nodejs.org/en/download/)
- [pnpm v10+](https://pnpm.io/installation)

Steps:

1) Clone the repo to local machine
```bash
  git clone https://github.com/saharansameer/habitarian.git
```

2) Install dependencies
```bash
cd habitarian # Make sure you are in project root

pnpm install
```

3) Run database migrations
```bash
# Before running this command, Make sure you had setup DATABASE_URL variable in .env file
pnpm run db:migrate
```

4) Start the dev server
```bash
pnpm run dev
```

App will run on [`http://localhost:3000`](http://localhost:3000) 

---

## Useful Scripts
- `pnpm run dev` - start Next.js in dev mode
- `pnpm run build` - build the app
- `pnpm run start` - start production server
- `pnpm run db:migrate` - run Drizzle migrations
- `pnpm run db:generate` - generate Drizzle migrations (if needed)

---

## Notes
- Keep `.env` private. Do not commit secrets.
- See `.env.example` for the complete list of required variables and guidance.

## Deployment
Fully deployed and live at [`habitarian.vercel.app`](https://habitarian.vercel.app)  
built by [`Sameer Saharan`](https://sameersaharan.com)