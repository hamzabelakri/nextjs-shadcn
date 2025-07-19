'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { auditHelpers } from '@/utils/audit'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SelectDropdown } from '@/components/select-dropdown'
import { Role } from '../data/schema'
import { permissionModules } from '../data/data'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Role name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  permissions: z.array(z.string()).min(1, { message: 'At least one permission is required.' }),
  status: z.enum(['active', 'inactive']),
})

type FormData = z.infer<typeof formSchema>

interface RolesActionModalProps {
  currentRow?: Role
  open: boolean
  onOpenChange: () => void
}

export function RolesActionModal({
  currentRow,
  open,
  onOpenChange,
}: RolesActionModalProps) {
  const isEdit = !!currentRow
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
      status: 'active',
    },
  })

  const watchedPermissions = form.watch('permissions')

  // Reset form when dialog opens/closes or when currentRow changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: currentRow?.name || '',
        description: currentRow?.description || '',
        permissions: currentRow?.permissions || [],
        status: currentRow?.status || 'active',
      })
    }
  }, [open, currentRow, form])

  function onSubmit(data: FormData) {
    const submitData = {
      ...data,
      id: currentRow?.id || `role_${Date.now()}`,
      userCount: currentRow?.userCount || 0,
      action: isEdit ? 'update' : 'create',
    }
    
    // Log audit entry
    if (isEdit && currentRow) {
      auditHelpers.roleUpdated(currentRow, submitData)
    } else {
      auditHelpers.roleCreated(submitData)
    }
    
    showSubmittedData(submitData)
    onOpenChange()
    
    // Reset form after submission
    if (!isEdit) {
      form.reset()
    }
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const currentPermissions = form.getValues('permissions')
    if (checked) {
      form.setValue('permissions', [...currentPermissions, permission])
    } else {
      form.setValue('permissions', currentPermissions.filter((p: string) => p !== permission))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Role' : 'Add New Role'}
          </DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Update role information and permissions' 
              : 'Create a new role with specific permissions'
            }
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
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
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      placeholder="Select status"
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      items={[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' },
                      ]}
                      isControlled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <FormItem>
                  <FormLabel>Permissions</FormLabel>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-32">Module</TableHead>
                          <TableHead className="text-center w-20">View</TableHead>
                          <TableHead className="text-center w-20">Create</TableHead>
                          <TableHead className="text-center w-20">Edit</TableHead>
                          <TableHead className="text-center w-20">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissionModules.map((module) => (
                          <TableRow key={module.key}>
                            <TableCell className="font-medium">{module.name}</TableCell>
                            {['view', 'create', 'edit', 'delete'].map((action) => {
                              const permission = `${module.key}.${action}`
                              
                              return (
                                <TableCell key={action} className="text-center">
                                  {module.permissions.includes(action) ? (
                                    <Checkbox
                                      checked={watchedPermissions.includes(permission)}
                                      onCheckedChange={(checked) => 
                                        handlePermissionChange(permission, checked as boolean)
                                      }
                                    />
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {watchedPermissions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">
                        Selected permissions ({watchedPermissions.length}):
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {watchedPermissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission.replace('.', ':')}
                          </Badge>
                        ))}
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
              <Button type="submit">
                {isEdit ? 'Update Role' : 'Create Role'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
