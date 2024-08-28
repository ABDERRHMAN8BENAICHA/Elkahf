import CountdownTimer from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="p-4">
        <h1 className="text-center font-extrabold text-2xl p-4">مرحبًا بكم في موقعنا</h1>
        <CountdownTimer />
      </div>
    </main>
  );
}
