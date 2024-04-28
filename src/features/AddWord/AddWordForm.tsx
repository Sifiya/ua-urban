'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { addWordWithDefinition } from '@/app/api/actions';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface AddWordFormProps {}

export const AddWordForm = ({}: AddWordFormProps) => {
  const router = useRouter();
  const formMethods = useForm({
    defaultValues: {
      word: '',
      definition: '',
    },
  });

  const onSubmit = async (data: { word: string; definition: string }) => {
    const { success, error, word_id } = await addWordWithDefinition(data.word, data.definition);
    if (word_id) {
      formMethods.reset();
      router.push(`/word/${word_id}`);
    }
    if (error) {
      console.error(error);
    }
  };

  return (
    <Card className="pt-3 pb-5 px-5">
      <Form {...formMethods}>
        <form 
          className="flex flex-col gap-5"
          onSubmit={formMethods.handleSubmit(onSubmit)}>
          <FormField
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Слово</FormLabel>
                <FormControl>
                  <Input placeholder="Введіть слово" {...field} maxLength={100} />
                </FormControl>
              </FormItem>
            )}
          />

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
    </Card>
  );
};
