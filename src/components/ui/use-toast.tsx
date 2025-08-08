"use client"

import * as React from "react"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps,
} from "@/components/ui/toast"

interface ToastContextProps {
  toast: (props: ToastProps & { 
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
  }) => void
}

const ToastContext = React.createContext<ToastContextProps>({
  toast: () => {},
})

export function useToast() {
  return React.useContext(ToastContext)
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastProps & { 
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
  })[]>([])

  const toast = React.useCallback(({ ...props }: ToastProps & { 
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((toasts) => [...toasts, { id, ...props }])

    return {
      dismiss: () => setToasts((toasts) => toasts.filter((toast) => toast.id !== id)),
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastProvider>
        {toasts.map(({ id, title, description, action, ...props }) => (
          <Toast key={id} {...props} onOpenChange={(open: boolean) => {
            if (!open) dismiss(id)
          }}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}
