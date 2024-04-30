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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { FaEnvelope } from 'react-icons/fa';

interface SignUpFormProps {
  noButton?: boolean;
}

type SignUpFormData = {
  email: string;
  password: string;
};

export const SignUpForm = ({ noButton = false }: SignUpFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
      setIsAlertOpen(true);
      setIsOpen(false);
      setErrorMessage(null);
    }
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            {noButton ? <span className="w-full text-center py-2 px-4">Реєстрація</span> : (
            <Button variant="default">
              Реєстрація
            </Button>
          )}
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

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex-row">
            <div className="flex pr-4 pt-3">
              <FaEnvelope size={40} className="text-foreground" />
            </div>
            <div className="grow">
              <AlertDialogTitle>
                Ви успішно зареєструвались!
              </AlertDialogTitle>
          
              <AlertDialogDescription>
                Вам на пошту надіслано лист з підтвердженням. Для повноцінного користування сайтом вам необхідно підтвердити свою пошту.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              Зрозуміло
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
