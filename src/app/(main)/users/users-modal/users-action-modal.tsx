"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { callTypes } from "../data/data";
import { User } from "../data/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  IconUserSearch,
  IconUserEdit,
  IconUserPlus,
} from "@tabler/icons-react";
import { useCreateUser, useUpdateUser } from "@/hooks/use-users";
import { useRoles } from "@/hooks/use-roles";
import { useToast } from "@/components/ui/use-toast";
import { transformBackendUserToFrontend } from "../utils/transform-user";
import { useAuthStore } from "@/store/authStore";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required." }),
    lastName: z.string().min(1, { message: "Last Name is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    phoneNumber: z.string()
      .min(1, { message: "Phone number is required." })
      .regex(/^\d+$/, { message: "Phone number must contain only numbers." }),
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
  const isEdit = mode === "edit";
  const isView = mode === "view";
  const isAdd = mode === "add";

  // React Query mutations and data
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const { data: roles, isLoading: rolesLoading } = useRoles();
  const { toast } = useToast();
  const auth = useAuthStore(state => state);
  const currentUser = auth.user;

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

  const onSubmit = async (values: UserForm) => {
    console.log("Debug info:", {
      currentUser,
      currentRow,
      isCurrentUser: currentUser?.id === parseInt(currentRow?.id || "0"),
      isAdmin: currentUser?.role === "admin"
    });

    try {
      if (isEdit && currentRow) {
        // Check permissions for update
        const isCurrentUser = currentUser?.id === parseInt(currentRow.id);
        const isAdmin = currentUser?.role === "admin";
        
        if (!isCurrentUser && !isAdmin) {
          toast({
            title: "Permission Denied",
            description: "You can only edit your own profile unless you are an admin",
            variant: "destructive",
          });
          return;
        }

        // Update existing user
        const selectedRole = roles?.find(role => role.name === values.role);
        const updateData = {
          username: values.username,
          name: `${values.firstName} ${values.lastName}`.trim(),
          email: values.email,
          phone_number: values.phoneNumber,
          role_id: selectedRole?.id,
          ...(values.password && { password: values.password }), // Only include password if provided
        };

        await updateUserMutation.mutateAsync({
          id: parseInt(currentRow.id),
          userData: updateData,
        });

        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else if (isAdd) {
        // Create new user
        const selectedRole = roles?.find(role => role.name === values.role);
        const createData = {
          username: values.username,
          name: `${values.firstName} ${values.lastName}`.trim(),
          email: values.email,
          password: values.password,
          phone_number: values.phoneNumber,
          role_id: selectedRole?.id || 0, // Default to 0 if no role selected (backend will use default)
        };

        await createUserMutation.mutateAsync(createData);

        toast({
          title: "Success",
          description: "User created successfully",
        });
      }

      form.reset();
      onOpenChange();
    } catch (error: any) {
      console.error('Failed to save user:', error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Failed to save user",
        variant: "destructive",
      });
    }
  };

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
            {isEdit ? "Edit User" : isView ? "View User" : "Add New User"}
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
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
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
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
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
                        placeholder="123456789"
                        className="col-span-4"
                        disabled={isView}
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onInput={(e) => {
                          // Remove any non-numeric characters
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.replace(/[^0-9]/g, '');
                        }}
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
                      placeholder={rolesLoading ? "Loading roles..." : "Select a role"}
                      disabled={isView || (isEdit && currentUser?.role !== "admin") || rolesLoading}
                      className="col-span-4"
                      items={roles?.map((role) => ({
                        label: role.name.charAt(0).toUpperCase() + role.name.slice(1), // Capitalize first letter
                        value: role.name,
                      })) || []}
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={isView}
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
