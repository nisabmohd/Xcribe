import { BirdIcon } from "lucide-react";

export default function Nav() {
  return (
    <nav className="mx-auto max-w-[1200px] lg:h-36 h-28 flex flex-col justify-center sm:px-5 px-2.5">
      <div className="flex gap-2 items-center">
        <BirdIcon />
        <h3 className="font-semibold text-lg">xcribe</h3>
      </div>
      <p className="text-muted-foreground mt-1">
        Your thoughts, perfectly Xcribed.
      </p>
    </nav>
  );
}
