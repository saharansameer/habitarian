export type FeedItem = {
  id: string;
  createdAt: string | Date;
  habit: { id: string; title: string; streak: number };
  user: { id: string; name: string };
};
