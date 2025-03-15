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
import Image from "next/image";

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
    padding,
    border,
    images,
  } = useTweetStore();

  const formattedDateTime = useMemo(
    () => formatDateTime(date as DateTimeInput),
    [date]
  );

  return (
    <div className="flex-1 flex flex-col gap-6 pt-1.5">
      <h3 className="px-0.5">Preview Tweet</h3>
      <div
        id="tweet-ui"
        className={cn(
          "w-full flex items-start gap-3 min-h-fit rounded-lg p-3.5 overflow-x-auto",
          apperance == "Dark" && "bg-black text-neutral-100 ",
          apperance == "Dim" && "bg-[#15202B] text-neutral-200",
          apperance == "Light" && "bg-neutral-50  text-neutral-700",
          font === "Inter" && "font-inter",
          font === "Poppins" && "font-poppins",
          padding == "4" && "p-3.5",
          padding == "8" && "p-5",
          padding == "16" && "p-8",
          padding == "32" && "p-12",
          border && "border",
          border && apperance == "Dark" && "border-neutral-700",
          border && apperance == "Light" && "border-neutral-200",
          border && apperance == "Dim" && "border-neutral-700/70"
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
                  <BadgeCheckIcon className="text-[#1DA1F2]" size={17} />
                )}
              </h4>
              <p
                className={cn(
                  "text-sm text-muted-foreground -mt-0.5",
                  apperance == "Light" && "text-neutral-500",
                  apperance == "Dim" && "text-neutral-400",
                  apperance == "Dark" && "text-neutral-400"
                )}
              >
                @{username}
              </p>
            </div>
          </div>
          <div className="text-[14.3px] flex gap-1 flex-wrap whitespace-pre-wrap my-1.5 break-words">
            {text}
          </div>
          <TweetImages images={images} apperance={apperance} />
          <div className="flex flex-col gap-2 mt-1">
            <div
              className={cn(
                "flex items-center gap-[0.42rem] sm:text-sm text-[13.5px] flex-wrap text-muted-foreground",
                apperance == "Light" && "text-neutral-500",
                apperance == "Dim" && "text-neutral-300",
                apperance == "Dark" && "text-neutral-400"
              )}
            >
              <div>{formattedDateTime?.time ?? "4:55PM"}</div> ·
              <div>{formattedDateTime?.date ?? "Feb 22, 2008"}</div> ·
              <div className="text-[#1DA1F2]">Twitter for {device}</div>
            </div>
            <div
              className={cn(
                "border-t flex items-center gap-5 pt-3 px-1 text-muted-foreground text-sm",
                apperance == "Dark" && "border-neutral-700 text-neutral-400",
                apperance == "Dim" && "border-neutral-700 text-neutral-300",
                apperance == "Light" && "border-neutral-200 text-neutral-500"
              )}
            >
              <div className="flex items-center gap-1.5">
                <MessageCircleIcon
                  size={16}
                  className="fill-current text-[#1DA1F2]"
                />
                <span
                  className={cn(
                    "text-primary",
                    apperance == "Light" && "text-neutral-600",
                    apperance == "Dim" && "text-neutral-200",
                    apperance == "Dark" && "text-neutral-100"
                  )}
                >
                  {formatNumber(comments)}
                </span>{" "}
                <span className="max-[410px]:hidden">Comments</span>
              </div>
              <div className="items-center gap-1.5 flex">
                <Repeat2Icon size={18} className="text-green-500" />
                <span
                  className={cn(
                    "text-primary ",
                    apperance == "Light" && "text-neutral-600",
                    apperance == "Dim" && "text-neutral-200",
                    apperance == "Dark" && "text-neutral-100"
                  )}
                >
                  {formatNumber(retweets)}
                </span>{" "}
                <span className="max-[410px]:hidden">Retweets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartIcon size={16} className="fill-current text-red-600" />
                <span
                  className={cn(
                    "text-primary",
                    apperance == "Light" && "text-neutral-600",
                    apperance == "Dim" && "text-neutral-200",
                    apperance == "Dark" && "text-neutral-100"
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

function TweetImages({
  images,
  apperance,
}: {
  images: string[];
  apperance: string;
}) {
  if (!images.length) return null;

  const imageClass = cn(
    "border rounded-sm overflow-hidden",
    apperance == "Dark" && "border-neutral-700",
    apperance == "Light" && "border-neutral-200",
    apperance == "Dim" && "border-neutral-700/70"
  );

  if (images.length === 1) {
    return (
      <div
        className={`relative aspect-square w-full max-h-[500px] ${imageClass}`}
      >
        <Image
          src={images[0]}
          alt="Tweet image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-[16/9] w-full ${imageClass}`}
          >
            <Image
              src={image}
              alt="Tweet image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div
          className={`relative col-span-2 aspect-[16/9] w-full ${imageClass}`}
        >
          <Image
            src={images[0]}
            alt="Tweet image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {images.slice(1).map((image, index) => (
          <div
            key={index}
            className={`relative aspect-square w-full ${imageClass}`}
          >
            <Image
              src={image}
              alt="Tweet image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative aspect-square w-full ${imageClass}`}
        >
          <Image
            src={image}
            alt="Tweet image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
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
