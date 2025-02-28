import { DateValue } from "react-aria-components";
import { create } from "zustand";

export const tweet_themes = ["Dark", "Light", "Dim"] as const;
export const tweet_devices = ["iPhone", "Android", "Web", "Windows"] as const;

// todo avatar
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
    device: typeof tweet_devices[number];
};

type TweetUpdateAction = {
    update: (data: Partial<TweetState>) => void;
};

export const useTweetStore = create<TweetState & TweetUpdateAction>((set) => ({
    apperance: "Dark",
    comments: 10,
    date: null,
    likes: 69,
    name: "John Doe",
    username: "johndoe69",
    retweets: 5,
    text: "lorem ipsum..",
    verified: false,
    device: "Android",
    update: (data) => set((prev) => ({ ...prev, ...data })),
}));
