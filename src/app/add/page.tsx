import React from 'react';
import { getUser } from '../api/auth.api';
import { redirect } from 'next/navigation';

import { AddWordForm } from '@/features/AddWord/AddWordForm';
import { Header2 } from '@/components/typography';

 
export const metadata = {
  title: 'Додати слово',
};

const AddWordPage = async () => {
  const { isAuthenticated } = await getUser();

  if (!isAuthenticated) {
    return redirect('/');
  }

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
