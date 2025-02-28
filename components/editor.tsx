"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { AtSignIcon } from "lucide-react";

import { tweet_themes, useTweetStore } from "@/store/tweet";
import NumberInput from "./number-input";
import DateTimeInput from "./date-time-input";

export default function Editor() {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <Content />
        </TabsContent>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="metrics">
          <Metrics />
        </TabsContent>
        <TabsContent value="appearance">
          <Appearance />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Content() {
  const { text, date, update } = useTweetStore();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content">Tweet contents</Label>
        <Textarea
          maxLength={280}
          id="content"
          placeholder="lorem ipsum tweet text..."
          value={text}
          onChange={(e) => update({ text: e.target.value })}
        />
      </div>
      <DateTimeInput
        value={date}
        onDateChange={(val) => update({ date: val })}
      />
    </div>
  );
}

function Profile() {
  const { update, verified, name, username } = useTweetStore();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullname">Display Name</Label>
        <Input
          id="fullname"
          placeholder="John Doe"
          value={name}
          onChange={(e) => update({ name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username">Username</Label>
        <div className="relative">
          <Input
            id="username"
            className="peer ps-9"
            placeholder="Username"
            value={username}
            onChange={(e) => update({ username: e.target.value })}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <AtSignIcon size={16} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <Switch
          id="verified"
          checked={verified}
          onCheckedChange={(val) => update({ verified: val })}
          aria-label="Toggle switch"
        />
        <Label htmlFor="verified" className="text-sm font-medium">
          Verified account
        </Label>
      </div>
    </div>
  );
}

const components = ["likes", "comments", "retweets"] as const;

function Metrics() {
  const { update, ...rest } = useTweetStore();
  return (
    <div className="flex flex-col gap-5">
      {components.map((it) => (
        <NumberInput
          key={it}
          label={it}
          onValueChange={(val) => update({ [it]: val })}
          value={rest[it]}
        />
      ))}
    </div>
  );
}

function Appearance() {
  const { apperance, update } = useTweetStore();
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="appearance">Appearance</Label>
      <Select
        value={apperance}
        onValueChange={(val) =>
          update({ apperance: val as (typeof tweet_themes)[number] })
        }
      >
        <SelectTrigger>
          <SelectValue id="appearance" placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {tweet_themes.map((it) => (
            <SelectItem key={it} value={it}>
              {it}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
