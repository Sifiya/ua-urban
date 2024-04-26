import React from 'react';
import { AddWordForm } from '@/features/AddWord/AddWordForm';
 
export const metadata = {
  title: 'Додати слово',
};

const AddWordPage = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
        Додати нове слово
      </h1>
      <AddWordForm />
    </div>
  );
};

export default AddWordPage;