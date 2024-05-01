'use client';

import React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '@/app/api/auth.api';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  FormMessage,
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
import Link from 'next/link';

interface SignUpFormProps {
  trigger: ReactNode;
}

type SignUpFormData = {
  email: string;
  password: string;
};

export const SignUpForm = ({ trigger }: SignUpFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formSchema = z.object({
    email: z.string().email('Введіть коректну електронну пошту'),
    password: z.string().min(6, { message: 'Пароль повинен містити мінімум 6 символів' }),
  });
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit, formState: { isValid } } = formMethods;

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
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent >
          <Form {...formMethods}>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-xs my-2 mx-1">
                  Натискаючи кнопку &quot;Зареєструватися&quot;, ви погоджуєтесь з нашою
                  <Link href="/privacy" className="mx-1 underline font-semibold" onClick={() => setIsOpen(false)}>
                    політикою конфіденційності
                  </Link>
                  і
                  <Link href="/terms" className="ml-1 underline font-semibold" onClick={() => setIsOpen(false)}>
                    умовами користування сайтом
                  </Link>.
                </p>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={!isValid}>Зареєструватися</Button>
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
                Вам на пошту надіслано лист з підтвердженням.
                Для повноцінного користування сайтом вам необхідно підтвердити свою пошту.
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
