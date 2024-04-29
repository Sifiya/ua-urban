import React from 'react';
import { AddWordForm } from '@/features/AddWord/AddWordForm';
import { Header2 } from '@/components/typography';
 
export const metadata = {
  title: 'Додати слово',
};

const AddWordPage = () => {
  return (
    <div>
      <Header2>
        Додати нове слово
      </Header2>
      <AddWordForm />
    </div>
  );
};

export default AddWordPage;