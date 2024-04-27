'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AddDefinitionForm } from './AddDefinitionForm';

export const AddDefinition = () => {
  const [showForm, setShowForm] = React.useState(false);

  if (!showForm) {
    return (
      <Button type="button" onClick={() => setShowForm(true)}>
        + Додати визначення
      </Button>
    );
  }

  return <AddDefinitionForm onSuccess={() => setShowForm(false)}/>;
};
