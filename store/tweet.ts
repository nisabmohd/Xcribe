import { DateValue } from "react-aria-components";
import { create } from "zustand";

export const tweet_themes = ["Dark", "Light", "Dim"] as const;
export const tweet_devices = ["iPhone", "Android", "Web", "Windows"] as const;
export const tweet_font = ["Inter", "Poppins", "Grotesk"] as const;

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
    avatar: string | undefined;
    font: typeof tweet_font[number];
};

type TweetUpdateAction = {
    update: (data: Partial<TweetState>) => void;
};

// TODO: persist
export const useTweetStore = create<TweetState & TweetUpdateAction>((set) => ({
    apperance: "Dark",
    comments: 10,
    date: null,
    likes: 69,
    name: "John Doe",
    username: "johndoe69",
    retweets: 5,
    text:
        "Do you know about ReturnType in TypeScript? What about Awaited or Parameters? ",
    verified: false,
    device: "Android",
    font: "Grotesk",
    avatar: undefined,
    update: (data) => set((prev) => ({ ...prev, ...data })),
}));
