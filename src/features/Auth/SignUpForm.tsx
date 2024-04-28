'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '@/app/api/auth.api';

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SignUpFormProps {}

type SignUpFormData = {
  email: string;
  password: string;
};

export const SignUpForm = ({}: SignUpFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formMethods = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }: SignUpFormData) => {
    const { success, error } = await signUp(email, password);
    if (success) {
      setIsOpen(false);
      setErrorMessage(null);
    }
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          Реєстрація
        </Button>
      </DialogTrigger>
      <DialogContent >
        <Form {...formMethods}>
          <form className="flex flex-col gap-5" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Реєстрація</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertTitle>Помилка</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

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
