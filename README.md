Словничок українського сленгу [UA Urban](https://ua-urban.vercel.app/) створенний за мотивами [Urban Dictionary](https://www.urbandictionary.com/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Технології

Основа - [Next.js](https://nextjs.org/)
База, авторизація — [Supabase](https://supabase.com/)
UI - [shadcn](https://ui.shadcn.com/docs/installation/next)
Також UI — [tailwind](https://tailwindcss.com/)

## Запуск проєкту

Вам знадобиться створити власний проєкт на [supabase](https://supabase.com/) якщо ви захочете запустити словник локально.
Дані:

```
  - words
    - id UUID
    - author_id UUID (беремо з юзера)
    - word VARCHAR
    - created_at TIMESTAMPTZ
  - definitions
    - id UUID
    - word_id UUID
    - author_id UUID (беремо з юзера)
    - text TEXT
    - upvotes_count INT
    - downvotes_count INT
    - created_at TIMESTAMPTZ
  - votes
    - id UUID
    - vote 'up' | 'down'
    - user_id UUID (беремо з юзера)
    - definition_id UUID
    - created_at TIMESTAMPTZ
```

Таблицям знадобляться коректні правила доступу до читання і запису.

Створіть .env файлик куди треба буде додати:

```
SUPABASE_API_URL=ваш_апі
SUPABASE_API_KEY=ваш_ключ
```

Після цього запуск:

```bash
$ npm install
$ npm run dev
```

Вітаю, у вас є власний словничок!

## Якщо ви хочете запропонувати зміни

**Назви Pull Request**
`[feat/fix/chore](module): explain the change`

Якщо заропоновані зміни стосуються UI, будь ласка додавайте скріншоти
