import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { HabitCategory, HabitFrequency } from "@/types";
import * as authSchema from "./auth-schema";

// Tables
export const habits = pgTable("habits", {
  id: text("id").default(sql`gen_random_uuid()::text`).primaryKey(),

  title: varchar("title", { length: 100 }).notNull(),
  category: text("category").$type<HabitCategory>().notNull(),
  frequency: text("frequency").$type<HabitFrequency>().notNull(),
  streak: integer("streak").default(0).notNull(),

  creator: text("creator"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const completions = pgTable("completions", {
  id: text("id").default(sql`gen_random_uuid()::text`).primaryKey(),

  habitId: text("habit_id").notNull(),
  creatorId: text("creator_id").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const follows = pgTable("follows", {
  id: text("id").default(sql`gen_random_uuid()::text`).primaryKey(),

  followee: text("followee"),
  follower: text("follower"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

// Relations
export const usersRelations = relations(authSchema.user, ({ many }) => ({
  creator: many(habits),
  completions: many(completions),
  followings: many(follows, {
    relationName: "follower",
  }),
  followers: many(follows, {
    relationName: "followee",
  }),
}));

export const habitsRelations = relations(habits, ({ one, many }) => ({
  creator: one(authSchema.user, {
    fields: [habits.creator],
    references: [authSchema.user.id],
  }),
  completions: many(completions),
}));

export const completionsRelations = relations(completions, ({ one }) => ({
  creator: one(authSchema.user, {
    fields: [completions.creatorId],
    references: [authSchema.user.id],
  }),
  habit: one(habits, {
    fields: [completions.habitId],
    references: [habits.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  followee: one(authSchema.user, {
    fields: [follows.followee],
    references: [authSchema.user.id],
  }),
  follower: one(authSchema.user, {
    fields: [follows.follower],
    references: [authSchema.user.id],
  }),
}));

// Types
export type User = typeof authSchema.user.$inferSelect
export type NewUser = typeof authSchema.user.$inferInsert
export type Habit = typeof habits.$inferSelect
export type NewHabit = typeof habits.$inferInsert
export type Completion = typeof completions.$inferSelect
export type NewCompletion = typeof completions.$inferInsert
export type Follow = typeof follows.$inferSelect
export type NewFollow = typeof follows.$inferInsert

export { authSchema };
