"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { auditHelpers } from "@/utils/audit";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectDropdown } from "@/components/select-dropdown";
import { Role } from "../data/schema";
import { permissionColorClass, usePermissionModules } from "../data/data";
import {
  IconShieldCog,
  IconShieldPlus,
  IconShieldSearch,
} from "@tabler/icons-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Role name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  permissions: z
    .array(z.string())
    .min(1, { message: "At least one permission is required." }),
  status: z.enum(["active", "inactive"]),
});

type FormData = z.infer<typeof formSchema>;

interface RolesActionModalProps {
  currentRow?: Role;
  open: boolean;
  onOpenChange: () => void;
  mode?: "add" | "edit" | "view";
  switchToEdit?: () => void;
}

export function RolesActionModal({
  currentRow,
  open,
  onOpenChange,
  mode,
  switchToEdit,
}: RolesActionModalProps) {
  const { t } = useTranslation();
  const isEdit = mode === "edit";
  const isView = mode === "view";
  const isAdd = mode === "add";
  
  const permissionModules = usePermissionModules();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
      status: "active",
    },
  });

  const watchedPermissions = form.watch("permissions");

  // Reset form when dialog opens/closes or when currentRow changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: currentRow?.name || "",
        description: currentRow?.description || "",
        permissions: currentRow?.permissions || [],
        status: currentRow?.status || "active",
      });
    }
  }, [open, currentRow, form]);

  function onSubmit(data: FormData) {
    const submitData = {
      ...data,
      id: currentRow?.id || `role_${Date.now()}`,
      userCount: currentRow?.userCount || 0,
      action: isEdit ? "update" : "create",
    };

    // Log audit entry
    if (isEdit && currentRow) {
      auditHelpers.roleUpdated(currentRow, submitData);
    } else {
      auditHelpers.roleCreated(submitData);
    }

    showSubmittedData(submitData);
    onOpenChange();

    // Reset form after submission
    if (!isEdit) {
      form.reset();
    }
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const currentPermissions = form.getValues("permissions");
    if (checked) {
      form.setValue("permissions", [...currentPermissions, permission]);
    } else {
      form.setValue(
        "permissions",
        currentPermissions.filter((p: string) => p !== permission)
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEdit && (
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconShieldCog className="size-5" />
              </div>
            )}
            {isView && (
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconShieldSearch className="size-5" />
              </div>
            )}
            {!isEdit && !isView && (
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconShieldPlus className="size-5" />
              </div>
            )}
            {isEdit ? t('edit_role') : isView ? t('view_role') : t('add_new_role')}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Role Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('placeholder_role_name')}
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
              name="permissions"
              render={() => (
                <FormItem>
                  <FormLabel>{t('permissions')}</FormLabel>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-32">{t('module')}</TableHead>
                          <TableHead className="text-center w-20">
                            View
                          </TableHead>
                          <TableHead className="text-center w-20">
                            Create
                          </TableHead>
                          <TableHead className="text-center w-20">
                            Edit
                          </TableHead>
                          <TableHead className="text-center w-20">
                            Delete
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissionModules.map((module) => (
                          <TableRow key={module.key}>
                            <TableCell className="font-medium">
                              {module.name}
                            </TableCell>
                            {["view", "create", "edit", "delete"].map(
                              (action) => {
                                const permission = `${module.key}.${action}`;

                                return (
                                  <TableCell
                                    key={action}
                                    className="text-center"
                                  >
                                    {module.permissions.includes(action) ? (
                                      <Checkbox
                                        checked={watchedPermissions.includes(
                                          permission
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (isView) return;
                                          handlePermissionChange(
                                            permission,
                                            checked as boolean
                                          );
                                        }}
                                      />
                                    ) : (
                                      <span className="text-muted-foreground">
                                        -
                                      </span>
                                    )}
                                  </TableCell>
                                );
                              }
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {watchedPermissions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">
                        {isView ? t('permissions') : t('selected_permissions')} (
                        {watchedPermissions.length}):
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {watchedPermissions.map((permission) => {
                          const action = permission.split(".")[1];

                          const colorClass = permissionColorClass[action];

                          return (
                            <Badge
                              key={permission}
                              className={`text-xs ${colorClass} border border-transparent`}
                            >
                              {permission.replace(".", ":")}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onOpenChange}>
                Cancel
              </Button>
              {isView ? (
                <Button
                form="role-form"
                  onClick={() => {
                    if (switchToEdit) switchToEdit();
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button type="submit">{t('submit')}</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
