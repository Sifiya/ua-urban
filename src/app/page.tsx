import { Button } from "@/components/ui/button";
import { AlphabetList } from "@/features/AlphabetList";
import Link from "next/link"; 

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-5">
      Тут буде словник. Новий деплой з гітхабу.
      <AlphabetList />
    </section>
  );
}
