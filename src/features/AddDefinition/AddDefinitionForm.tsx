import React from 'react';
import { set, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { addDefinition } from '@/app/actions';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AddDefinitionFormProps = {
  onSuccess?: () => void;
};

export const AddDefinitionForm = ({ onSuccess }: AddDefinitionFormProps) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { wordId } = useParams();
  const formMethods = useForm({
    defaultValues: {
      definition: '',
    },
  });

  const onSubmit = async (data: { definition: string }) => {
    try {
      await addDefinition(data.definition, wordId as string);
      setErrorMessage(null);
      onSuccess && onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Card className="pt-3 pb-5 px-5">
      <Form {...formMethods}>
        <form 
          className="flex flex-col gap-5"
          onSubmit={formMethods.handleSubmit(onSubmit)}>

          <FormField
            name="definition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Визначення</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Введіть визначення"
                    {...field}
                    maxLength={2000}
                    style={{ resize: 'none' }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg">
            Додати
          </Button>
        </form>
      </Form>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Помилка</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </Card>
  );
};
