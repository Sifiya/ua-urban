import { AlphabetList } from "@/features/AlphabetList";
import { Header1, Header2, Paragraph } from "@/components/typography";
import { SearchMainBlock } from "@/features/Search";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center lg:gap-5 gap-2 pt-4">
      <Header1 className="text-center text-2xl">Словник українського сленгу</Header1>
      <Paragraph className="max-w-[500px]">
        Цей сайт має на меті збирати та систематизувати український сленг, як неодмінну частину сучасної інтернет-культури.
      </Paragraph>

      <SearchMainBlock />
      <Header2 className="mb-3">Алфавітний покажчик</Header2>
      <AlphabetList />
    </section>
  );
}
