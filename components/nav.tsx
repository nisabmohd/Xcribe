import { BirdIcon } from "lucide-react";

export default function Nav() {
  return (
    <nav className="mx-auto max-w-[1200px] h-20 flex gap-2 items-center px-5">
      <BirdIcon />
      <h3 className="font-semibold text-lg">xcribe</h3>
    </nav>
  );
}
