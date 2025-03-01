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
    images: string[]; // todo
};

type TweetUpdateAction = {
    update: (data: Partial<TweetState>) => void;
};

export const useTweetStore = create<TweetState & TweetUpdateAction>((set) => ({
    apperance: "Dark",
    comments: 21,
    date: null,
    likes: 690,
    name: "Peter Griffin",
    username: "RealPeterG",
    retweets: 78,
    text: `Doctor said I need to eat healthier.  
So I started adding lettuce to my burgers.  

Now I’m basically a nutritionist. 🥗`,
    verified: true,
    device: "iPhone",
    font: "Grotesk",
    avatar: "/peter.jpg",
    images: [],
    update: (data) => set((prev) => ({ ...prev, ...data })),
}));
