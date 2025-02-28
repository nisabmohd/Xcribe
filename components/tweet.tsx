"use client";

import { Button } from "@/components/ui/button";
import { useTweetStore } from "@/store/tweet";
import {
  ClipboardCopyIcon,
  DownloadIcon,
  HeartIcon,
  LinkIcon,
  MessageCircleIcon,
  Repeat2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Tweet() {
  const { text, name, username } = useTweetStore();
  return (
    <div className="flex-1 flex flex-col gap-6 pt-1.5">
      <h3 className="px-0.5">Preview Tweet</h3>
      <div className="w-full flex items-start gap-3 bg-neutral-900/50 min-h-52 rounded-lg p-3.5 border">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://originui.com/avatar-80-07.jpg"
                alt="Kelly King"
              />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <h4>{name}</h4>
              <p className="text-sm text-muted-foreground">@{username}</p>
            </div>
          </div>
          <div className="text-[14.3px] whitespace-pre-wrap my-1.5">{text}</div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <div>09:04PM</div> ·<div>May 1,2024</div> ·
              <div className="text-sky-500">Twitter for Android</div>
            </div>
            <div className="border-t flex items-center gap-5 text-sm pt-3 px-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MessageCircleIcon
                  size={14}
                  className="fill-current text-sky-600"
                />
                <span className="text-primary">3,2854</span> Comments
              </div>
              <div className="flex items-center gap-2">
                <Repeat2Icon size={14} className="" />
                <span className="text-primary">1,098</span> Retweets
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon size={14} className="fill-current text-red-600" />
                <span className="text-primary">21.4k</span> Likes
              </div>
            </div>
          </div>
        </div>
      </div>
      <TweetActions />
    </div>
  );
}

function TweetActions() {
  return (
    <div className="flex items-center gap-3 mx-auto mt-1">
      <Button variant="secondary" className="text-sm cursor-pointer">
        <DownloadIcon />
        Download Image
      </Button>
      <Button variant="secondary" className="text-sm cursor-pointer">
        <ClipboardCopyIcon />
        Copy HTML
      </Button>
      <Button variant="secondary" className="text-sm cursor-pointer">
        <LinkIcon />
        Share URL
      </Button>
    </div>
  );
}
