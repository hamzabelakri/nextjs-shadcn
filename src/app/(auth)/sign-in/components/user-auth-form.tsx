"use client";

import { HTMLAttributes } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandFacebook, IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { useTranslation } from "react-i18next";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('please_enter_email') })
      .email({ message: t('invalid_email') }),
    password: z
      .string()
      .min(1, {
        message: t('please_enter_password'),
      })
      .min(7, {
        message: t('password_min_length'),
      }),
  });

  const defaultValues = {
    email: "admin@asteroidea.com",
    password: "admin123",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const auth = await login(data);
      console.log("Login success:", auth);
      setAuth(auth);
      router.push("/dashboard");

    } catch (error: any) {
      console.error("Login failed:", error);
      // Later: toast.error(error.response?.data?.message || "Login failed");
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('name_example_placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder={t('password_placeholder')} {...field} />
              </FormControl>
              <FormMessage />
              <Link
                href="/forgot-password"
                className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
              >
                {t('forgot_your_password')}
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isSubmitting}>
          {t('login')}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              {t('or_continue_with')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button" disabled={isSubmitting}>
            <IconBrandGithub className="h-4 w-4" /> {t('github')}
          </Button>
          <Button variant="outline" type="button" disabled={isSubmitting}>
            <IconBrandFacebook className="h-4 w-4" /> {t('facebook')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
