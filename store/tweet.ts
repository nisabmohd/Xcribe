import { DateValue } from "react-aria-components";
import { create } from "zustand";

export const tweet_themes = ["dark", "light", "dim"] as const;

type TweetState = {
    text: string;
    date: DateValue | null;
    apperance: typeof tweet_themes[number];
    name: string;
    username: string;
    verified: boolean;
    likes: number;
    comments: number;
    retweets: number;
};

type TweetUpdateAction = {
    update: (data: Partial<TweetState>) => void;
};

export const useTweetStore = create<TweetState & TweetUpdateAction>((set) => ({
    apperance: "light",
    comments: 10,
    date: null,
    likes: 69,
    name: "John Doe",
    username: "johndoe69",
    retweets: 5,
    text: "lorem ipsum..",
    verified: false,
    update: (data) => set((prev) => ({ ...prev, ...data })),
}));
