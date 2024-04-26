import { Button } from "@/components/ui/button";
import Link from "next/link"; 

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      Тут буде словник. Новий деплой з гітхабу.
      <Link href="/add">
        <Button variant="default" size="lg">Додати слово</Button>
      </Link>
    </section>
  );
}
