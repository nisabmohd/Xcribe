import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, DownloadIcon, LinkIcon } from "lucide-react";

export default function Tweet() {
  return (
    <div className="flex-1 flex flex-col gap-6 pt-1.5">
      <h3 className="font-semibold">Preview Tweet</h3>
      <div className="w-full bg-neutral-900 h-52 rounded-md p-4 border">
        tweet
      </div>
      <div className="flex items-center gap-3 mx-auto">
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
    </div>
  );
}
