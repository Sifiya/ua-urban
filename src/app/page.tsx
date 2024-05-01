import { AlphabetList } from '@/features/AlphabetList';
import { Header1, Header2, Paragraph } from '@/components/typography';
import { SearchMainBlock } from '@/features/Search';
import { SignInForm, SignUpForm } from '@/features/Auth';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center lg:gap-5 gap-2 pt-4">
      <Header1 className="text-center text-2xl">Словник українського сленгу</Header1>
      <Paragraph className="max-w-[500px]">
        Цей сайт має на меті збирати та систематизувати український сленг,
        як неодмінну частину сучасної інтернет-культури.
        <br /><br />
        Ви можете самостійно додавати визначення і нові слова на сайт,
        для цього потрібно 
        <SignUpForm trigger={(
          <span className="mx-1 font-semibold cursor-pointer hover:underline">
            зареєструватися
          </span>
        )} />
        або
        <SignInForm trigger={(
          <span className="mx-1 font-semibold cursor-pointer hover:underline">
            увійти
          </span>
        )}/>.
      </Paragraph>

      <SearchMainBlock />
      <Header2 className="mb-3">Алфавітний покажчик</Header2>
      <AlphabetList />
    </section>
  );
}
