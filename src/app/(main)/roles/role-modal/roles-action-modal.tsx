"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconShieldPlus } from "@tabler/icons-react";
import { useCreateRole, useUpdateRole } from "@/hooks/use-roles";
import { Role } from "@/lib/api";
import { useRolesStore } from "@/store/roles-store";
import { getPermissionLabel } from "@/utils/permissions";

// Granular permissions schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Role name is required." }),
  description: z.string().optional(),
  permissions: z.object({
    users: z.string(),
    roles: z.string(),
    audit: z.string(),
    settings: z.string(),
    dashboard: z.string(),
  }),
});

type FormData = z.infer<typeof formSchema>;

interface RolesActionModalProps {
  currentRow?: Role;
  open: boolean;
  onOpenChange: () => void;
  mode?: "add" | "edit" | "view";
  switchToEdit?: () => void;
}

// Module configuration with action availability
const modules = [
  {
    name: "users",
    label: "Users",
    actions: { view: true, create: true, edit: true, delete: true }
  },
  {
    name: "roles",
    label: "Roles", 
    actions: { view: true, create: true, edit: true, delete: true }
  },
  {
    name: "audit",
    label: "Audit Logs",
    actions: { view: true, create: false, edit: false, delete: false }
  },
  {
    name: "settings",
    label: "Settings",
    actions: { view: true, create: false, edit: true, delete: false }
  },
  {
    name: "dashboard",
    label: "Dashboard",
    actions: { view: true, create: false, edit: false, delete: false }
  }
];

// Helper to parse permission string to boolean array
const parsePermissions = (permissionStr: string): boolean[] => {
  return permissionStr.split(',').map(p => p === '1');
};

// Helper to convert boolean array to permission string
const stringifyPermissions = (permissions: boolean[]): string => {
  return permissions.map(p => p ? '1' : '0').join(',');
};

export function RolesActionModal({
  currentRow,
  open,
  onOpenChange,
  mode,
  switchToEdit,
}: RolesActionModalProps) {
  const isEdit = mode === "edit";
  const isView = mode === "view";
  const isAdd = mode === "add";
  
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);
  
  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: {
        users: "0,0,0,0",
        roles: "0,0,0,0", 
        audit: "0,0,0,0",
        settings: "0,0,0,0",
        dashboard: "1,0,0,0", // Always enable dashboard view permission
      },
    },
  });

  // Reset form when dialog opens/closes or when currentRow changes
  useEffect(() => {
    if (open && currentRow) {
      setPermissionsLoaded(false);
      
      // currentRow is now directly the API Role type
      const permissions = currentRow.permissions || {};
      
      console.log('Current row:', currentRow);
      console.log('Permissions to use:', permissions);
      
      let formPermissions;
      
      if (Array.isArray(permissions)) {
        // Backend is returning array format ['audit', 'dashboard', 'roles', 'settings', 'users']
        // Convert to granular permissions based on what modules are in the array
        const moduleNames = permissions as string[];
        formPermissions = {
          users: moduleNames.includes('users') ? "1,1,1,1" : "0,0,0,0",
          roles: moduleNames.includes('roles') ? "1,1,1,1" : "0,0,0,0", 
          audit: moduleNames.includes('audit') ? "1,0,0,0" : "0,0,0,0", 
          settings: moduleNames.includes('settings') ? "1,0,1,0" : "0,0,0,0", 
          dashboard: "1,0,0,0", // Always enable dashboard view permission
        };
      } else if (permissions && typeof permissions === 'object') {
        // Backend is returning object format with granular permission strings
        formPermissions = {
          users: permissions.users || "0,0,0,0",
          roles: permissions.roles || "0,0,0,0",
          audit: permissions.audit || "0,0,0,0",
          settings: permissions.settings || "0,0,0,0",
          dashboard: permissions.dashboard ? permissions.dashboard : "1,0,0,0", // Ensure dashboard view is always enabled
        };
      } else {
        // Default fallback
        formPermissions = {
          users: "0,0,0,0",
          roles: "0,0,0,0",
          audit: "0,0,0,0",
          settings: "0,0,0,0",
          dashboard: "1,0,0,0", // Always enable dashboard view permission
        };
      }
      
      const formData = {
        name: currentRow.name || "",
        description: currentRow.description || "",
        permissions: formPermissions,
      };
      
      console.log('Setting form data:', formData);
      
      // Reset form with new data
      form.reset(formData);
      
      // Use setTimeout to ensure the form reset is complete before setting individual values
      setTimeout(() => {
        console.log('Setting individual permission values...');
        Object.keys(formPermissions).forEach(key => {
          const permissionKey = key as keyof typeof formPermissions;
          const value = formPermissions[permissionKey];
          console.log(`Setting ${key} to:`, value);
          form.setValue(`permissions.${key}` as any, value, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false,
          });
        });
        // Trigger a re-render to update the UI
        form.trigger();
        setPermissionsLoaded(true);
        console.log('Form values after setting:', form.getValues());
      }, 150); // Increased timeout even more
    } else if (open && isAdd) {
      setPermissionsLoaded(false);
      const defaultPermissions = {
        users: "0,0,0,0",
        roles: "0,0,0,0",
        audit: "0,0,0,0", 
        settings: "0,0,0,0",
        dashboard: "1,0,0,0", // Always enable dashboard view permission
      };
      
      form.reset({
        name: "",
        description: "",
        permissions: defaultPermissions,
      });
      
      // Ensure default values are properly set
      setTimeout(() => {
        Object.keys(defaultPermissions).forEach(key => {
          const permissionKey = key as keyof typeof defaultPermissions;
          form.setValue(`permissions.${key}` as any, defaultPermissions[permissionKey], {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false,
          });
        });
        setPermissionsLoaded(true);
      }, 100);
    }
  }, [open, currentRow, form, isAdd]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEdit && currentRow) {
        // currentRow is now directly the API Role type
        const roleId: number = Number(currentRow.id);
        
        await updateRoleMutation.mutateAsync({
          id: roleId,
          roleData: {
            name: data.name,
            description: data.description,
            permissions: data.permissions,
          }
        });
      } else {
        await createRoleMutation.mutateAsync({
          name: data.name,
          description: data.description,
          permissions: data.permissions,
        });
      }
      onOpenChange();
      form.reset();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handlePermissionChange = (moduleName: string, actionIndex: number, checked: boolean) => {
    // Prevent unchecking dashboard view permission
    if (moduleName === 'dashboard' && actionIndex === 0 && !checked) {
      return; // Don't allow unchecking dashboard view
    }
    
    const currentPermissions = form.getValues(`permissions.${moduleName}` as any) as string;
    const permissionArray = parsePermissions(currentPermissions || "0,0,0,0");
    permissionArray[actionIndex] = checked;
    
    // Ensure dashboard view is always enabled
    if (moduleName === 'dashboard') {
      permissionArray[0] = true; // Always keep view enabled
    }
    
    const newPermissionString = stringifyPermissions(permissionArray);
    form.setValue(`permissions.${moduleName}` as any, newPermissionString, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    
    // Force a form trigger to update watchers
    form.trigger(`permissions.${moduleName}` as any);
  };

  // Debug effect to log current form state
  useEffect(() => {
    if (open && currentRow) {
      console.log('=== DEBUG PERMISSIONS ===');
      console.log('Current row permissions:', currentRow.permissions);
      console.log('Permissions type:', typeof currentRow.permissions);
      console.log('Is array:', Array.isArray(currentRow.permissions));
      console.log('Form permissions:', form.getValues('permissions'));
      console.log('Permissions loaded:', permissionsLoaded);
      
      // Log individual module permissions
      modules.forEach(module => {
        const permissionValue = form.getValues(`permissions.${module.name}` as any);
        const parsed = parsePermissions(permissionValue || "0,0,0,0");
        console.log(`${module.name}: "${permissionValue}" -> [${parsed.join(', ')}]`);
      });
      console.log('========================');
    }
  }, [open, currentRow, permissionsLoaded, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconShieldPlus className="h-5 w-5" />
            {isAdd ? "Add New Role" : isEdit ? "Edit Role" : "View Role"}
          </DialogTitle>
          <DialogDescription>
            {isAdd && "Create a new role with specific permissions for system modules."}
            {isEdit && "Update the role information and permissions."}
            {isView && "View role details and permissions."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter role name"
                        {...field}
                        disabled={isView}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter role description"
                        {...field}
                        disabled={isView}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Permissions</FormLabel>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Module</TableHead>
                      <TableHead className="text-center">View</TableHead>
                      <TableHead className="text-center">Create</TableHead>
                      <TableHead className="text-center">Edit</TableHead>
                      <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((module) => {
                      const permissionValue = form.watch(`permissions.${module.name}` as any);
                      const permissions = parsePermissions(permissionValue || "0,0,0,0");
                      
                      return (
                        <TableRow key={module.name}>
                          <TableCell className="font-medium">{module.label}</TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={permissions[0]}
                              disabled={isView || !module.actions.view || module.name === 'dashboard'} // Disable dashboard view checkbox
                              onCheckedChange={(checked) => 
                                handlePermissionChange(module.name, 0, !!checked)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={permissions[1]}
                              disabled={isView || !module.actions.create}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(module.name, 1, !!checked)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={permissions[2]}
                              disabled={isView || !module.actions.edit}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(module.name, 2, !!checked)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={permissions[3]}
                              disabled={isView || !module.actions.delete}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(module.name, 3, !!checked)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              {/* Permission Summary for View Mode */}
              {isView && (
                <div className="mt-4 space-y-2">
                  <FormLabel>Permission Summary</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {modules.map((module) => {
                      const permissionValue = form.watch(`permissions.${module.name}` as any);
                      const permissionLabel = getPermissionLabel(permissionValue || "0,0,0,0");
                      
                      if (permissionLabel === 'No Access') return null;
                      
                      return (
                        <Badge key={module.name} variant="secondary" className="text-sm">
                          {module.label}: {permissionLabel}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              {isView ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onOpenChange}>
                    Close
                  </Button>
                  {switchToEdit && (
                    <Button onClick={switchToEdit}>
                      Edit Role
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onOpenChange}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={createRoleMutation.isPending || updateRoleMutation.isPending}
                  >
                    {isEdit ? "Update" : "Create"} Role
                  </Button>
                </div>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
