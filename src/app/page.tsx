import { AlphabetList } from "@/features/AlphabetList";
import { Header1, Header2, Paragraph } from "@/components/typography";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-5 pt-10">
      <Header1>Словник українського сленгу</Header1>
      <Paragraph className="max-w-[500px]">
        Цей сайт має на меті збирати та систематизувати український сленг, як неодмінну частину сучасної інтернет-культури.
      </Paragraph>
      <Header2 className="mb-3">Алфавітний покажчик</Header2>
      <AlphabetList />
    </section>
  );
}
