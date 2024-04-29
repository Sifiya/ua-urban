'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AddDefinitionForm } from './AddDefinitionForm';
import { useProfile } from '@/hooks/useProfile';

export const AddDefinition = () => {
  const { isAuthenticated } = useProfile();
  const [showForm, setShowForm] = React.useState(false);

  if (!isAuthenticated) {
    return null;
  }

  if (!showForm) {
    return (
      <Button type="button" onClick={() => setShowForm(true)}>
        + Додати визначення
      </Button>
    );
  }

  return <AddDefinitionForm onSuccess={() => setShowForm(false)}/>;
};
