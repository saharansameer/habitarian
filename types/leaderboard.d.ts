export type LeaderboardItem = {
  user: { id: string; name: string; createdAt: string | Date };
  highestStreak: number;
  activeHabits: number;
};
