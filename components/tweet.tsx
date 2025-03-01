"use client";

import { Button } from "@/components/ui/button";
import { useTweetStore } from "@/store/tweet";
import {
  BadgeCheckIcon,
  DownloadIcon,
  HeartIcon,
  MessageCircleIcon,
  Repeat2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, DateTimeInput, formatDateTime, formatNumber } from "@/lib/utils";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { useMemo } from "react";

export default function Tweet() {
  const {
    text,
    name,
    username,
    device,
    verified,
    likes,
    comments,
    retweets,
    avatar,
    date,
    apperance,
    font,
  } = useTweetStore();

  const formattedDateTime = useMemo(
    () => formatDateTime(date as DateTimeInput),
    [date]
  );

  // todo hastag highlight

  return (
    <div className="flex-1 flex flex-col gap-6 pt-1.5">
      <h3 className="px-0.5">Preview Tweet</h3>
      <div
        id="tweet-ui"
        className={cn(
          "w-full flex items-start gap-3 min-h-fit rounded-lg p-3.5 border overflow-x-auto bg-neutral-950/50",
          apperance == "Dark" && "bg-neutral-950/50",
          apperance == "Dim" && "bg-[#15202B] border-neutral-700/70",
          apperance == "Light" &&
            "bg-neutral-100 border-neutral-300 text-neutral-700",
          font === "Inter" && "font-inter",
          font === "Poppins" && "font-poppins"
        )}
      >
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="flex items-center gap-1.5">
                {name}{" "}
                {verified && (
                  <BadgeCheckIcon className="text-[#1DA1F2]" size={15} />
                )}
              </h4>
              <p
                className={cn(
                  "text-sm text-muted-foreground -mt-0.5",
                  apperance == "Light" && "text-neutral-500"
                )}
              >
                @{username}
              </p>
            </div>
          </div>
          <div className="text-[14.3px] flex gap-1 flex-wrap whitespace-pre-wrap my-1.5 break-words">
            {text}
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <div
              className={cn(
                "flex items-center gap-[0.42rem] sm:text-sm text-[13.5px] flex-wrap text-muted-foreground",
                apperance == "Light" && "text-neutral-500"
              )}
            >
              <div>{formattedDateTime?.time}</div> ·
              <div>{formattedDateTime?.date}</div> ·
              <div className="text-[#1DA1F2]">Twitter for {device}</div>
            </div>
            <div
              className={cn(
                "border-t flex items-center gap-5 pt-3 px-1 text-muted-foreground text-sm",
                apperance == "Dim" && "border-neutral-700",
                apperance == "Light" && "border-neutral-300 text-neutral-500"
              )}
            >
              <div className="flex items-center gap-1.5">
                <MessageCircleIcon
                  size={14}
                  className="fill-current text-[#1DA1F2]"
                />
                <span
                  className={cn(
                    "text-primary",
                    apperance == "Light" && "text-neutral-600"
                  )}
                >
                  {formatNumber(comments)}
                </span>{" "}
                <span className="max-[410px]:hidden">Comments</span>
              </div>
              <div className="items-center gap-1.5 flex">
                <Repeat2Icon size={16} className="text-green-500" />
                <span
                  className={cn(
                    "text-primary ",
                    apperance == "Light" && "text-neutral-600"
                  )}
                >
                  {formatNumber(retweets)}
                </span>{" "}
                <span className="max-[410px]:hidden">Retweets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartIcon size={14} className="fill-current text-red-600" />
                <span
                  className={cn(
                    "text-primary",
                    apperance == "Light" && "text-neutral-600"
                  )}
                >
                  {formatNumber(likes)}
                </span>{" "}
                <span className="max-[410px]:hidden">Likes</span>
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
  function handleExportImage() {
    const elem = document.getElementById("tweet-ui");
    if (!elem) return;
    htmlToImage.toPng(elem).then((dataUrl) => download(dataUrl, "tweet.png"));
  }

  return (
    <div className="flex items-center gap-3 mx-auto">
      <Button
        variant="secondary"
        onClick={handleExportImage}
        className="text-sm cursor-pointer"
      >
        <DownloadIcon />
        Download PNG
      </Button>
    </div>
  );
}
