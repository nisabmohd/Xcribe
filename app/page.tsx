import Editor from "@/components/editor";
import Tweet from "@/components/tweet";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto py-8 flex lg:flex-row flex-col gap-12 sm:px-5 px-2.5">
      <Editor />
      <Tweet />
    </div>
  );
}
