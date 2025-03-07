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
import NumberInput from "./number-input";
import DateTimeInput from "./date-time-input";
import { AtSignIcon } from "lucide-react";

import {
  padding_values,
  tweet_devices,
  tweet_font,
  tweet_themes,
  useTweetStore,
} from "@/store/tweet";

// TODO: AI to generate tweet
// TODO: Threads Maker
// TODO: Add images

export default function Editor() {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="max-w-full">
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
        <Label htmlFor="avatar">Avatar</Label>

        <Input
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              update({
                avatar: URL.createObjectURL(file),
              });
            }
          }}
          id="avatar"
          className="p-0 file:px-2 file:h-full file:me-3 file:border-0 file:border-e file:border-border"
          type="file"
          accept="image/*"
        />
      </div>
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
  const { apperance, update, device, font, padding, border } = useTweetStore();
  return (
    <div className="grid grid-cols-1 gap-5">
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
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="device">Device</Label>
        <Select
          value={device}
          onValueChange={(val) =>
            update({ device: val as (typeof tweet_devices)[number] })
          }
        >
          <SelectTrigger>
            <SelectValue id="device" placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {tweet_devices.map((it) => (
              <SelectItem key={it} value={it}>
                {it}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="font">Font</Label>
        <Select
          value={font}
          onValueChange={(val) =>
            update({ font: val as (typeof tweet_font)[number] })
          }
        >
          <SelectTrigger>
            <SelectValue id="font" placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {tweet_font.map((it) => (
              <SelectItem key={it} value={it}>
                {it}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="padding">Padding</Label>
        <Select
          value={padding}
          onValueChange={(val) =>
            update({ padding: val as (typeof padding_values)[number] })
          }
        >
          <SelectTrigger>
            <SelectValue id="padding" placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {padding_values.map((it) => (
              <SelectItem key={it} value={it}>
                {it}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <Switch
          id="border"
          checked={border}
          onCheckedChange={(val) => update({ border: val })}
          aria-label="Toggle switch"
        />
        <Label htmlFor="border" className="text-sm font-medium">
          Border outside
        </Label>
      </div>
    </div>
  );
}
