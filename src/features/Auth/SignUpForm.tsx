'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

interface SignUpFormProps {}

export const SignUpForm = ({}: SignUpFormProps) => {
  const formMethods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Реєстрація</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...formMethods}>
          <form className="flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Реєстрація</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">

              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Електронна пошта</FormLabel>
                    <FormControl>
                      <Input placeholder="Введіть електронну пошту" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input placeholder="Введіть пароль" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

            </div>
            <DialogFooter>
              <Button type="submit">Зареєструватися</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
