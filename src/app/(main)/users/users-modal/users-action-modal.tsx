"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { SelectDropdown } from "@/components/select-dropdown";
import { callTypes, useUserTypes } from "../data/data";
import { User } from "../data/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  IconUserSearch,
  IconUserEdit,
  IconUserPlus,
} from "@tabler/icons-react";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required." }),
    lastName: z.string().min(1, { message: "Last Name is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    phoneNumber: z.string().min(1, { message: "Phone number is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Email is invalid." }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().min(1, { message: "Role is required." }),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== "")) {
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required.",
          path: ["password"],
        });
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long.",
          path: ["password"],
        });
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one lowercase letter.",
          path: ["password"],
        });
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one number.",
          path: ["password"],
        });
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match.",
          path: ["confirmPassword"],
        });
      }
    }
  });
type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: User;
  open: boolean;
  onOpenChange: () => void;
  mode?: "add" | "edit" | "view";
  switchToEdit?: () => void;
}

export function UsersActionModal({
  currentRow,
  open,
  onOpenChange,
  mode,
  switchToEdit,
}: Props) {
  const { t } = useTranslation();
  const isEdit = mode === "edit";
  const isView = mode === "view";
  const isAdd = mode === "add";
  
  const userTypes = useUserTypes();

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          ...currentRow,
          password: "",
          confirmPassword: "",
          isEdit: isEdit,
        }
      : {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          role: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          isEdit: isEdit,
        },
  });

  const onSubmit = (values: UserForm) => {
    form.reset();
    showSubmittedData(values);
    onOpenChange();
  };

  const isPasswordTouched = !!form.formState.dirtyFields.password;
  const statusColor = currentRow ? callTypes.get(currentRow.status) : undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left ">
          <DialogTitle className="flex items-center gap-2">
            {isEdit && (
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconUserEdit className="size-5" />
              </div>
            )}
            {isView && (
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconUserSearch className="size-5" />
              </div>
            )}
            {!isEdit && !isView && (
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconUserPlus className="size-5" />
              </div>
            )}
            {isEdit ? t('edit_user') : isView ? t('view_user') : t('add_user')}
          </DialogTitle>
        </DialogHeader>
        <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      {t('first_name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('placeholder_first_name')}
                        className="col-span-4"
                        autoComplete="off"
                        disabled={isView}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      {t('last_name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('placeholder_last_name')}
                        className="col-span-4"
                        autoComplete="off"
                        disabled={isView}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john_doe"
                        className="col-span-4"
                        disabled={isView}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="col-span-4"
                        disabled={isView}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+123456789"
                        className="col-span-4"
                        disabled={isView}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Role
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('placeholder_select_role')}
                      disabled={isView}
                      className="col-span-4"
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="e.g., S3cur3P@ssw0rd"
                        className="col-span-4"
                        disabled={isView || !isPasswordTouched}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={isView || !isPasswordTouched}
                        placeholder="e.g., S3cur3P@ssw0rd"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
            {isView && currentRow && (
              <div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1 mt-4">
                <label className="text-sm font-medium text-muted-foreground col-span-2">
                  Status
                </label>
                <div className="col-span-4 mt-1">
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusColor)}
                  >
                    {currentRow.status}
                  </Badge>
                </div>
              </div>
            )}
          </Form>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onOpenChange}>
            Cancel
          </Button>
          {isView ? (
            <Button
              form="user-form"
              onClick={() => {
                if (switchToEdit) switchToEdit();
              }}
            >
              Edit
            </Button>
          ) : (
            <Button type="submit" form="user-form">
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
