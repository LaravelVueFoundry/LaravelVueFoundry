import { ref } from "vue"
import { Toast, ToastOptions } from "../../Toast/types/toast"

const toasts = ref<Toast[]>([])

export default function useToast() {
  const notify = (message: string, options: ToastOptions) => {
    const id = toasts.value.length
      ? Math.max(...toasts.value.map((toast) => toast.id)) + 1
      : 1

    toasts.value.push({ id, message, ...options })
  }

  const info = (message: string, options?: ToastOptions) => {
    return notify(message, {
      icon: "mdi:info",
      iconClasses: "text-info-500",
      ...options,
    })
  }

  const warning = (message: string, options?: ToastOptions) => {
    return notify(message, {
      bgClasses:
        "bg-warning-100 dark:bg-warning-950 dark:border-warning-900 border-warning-200",
      icon: "mdi:alert-octagon",
      iconClasses: "text-warning-500",
      ...options,
    })
  }

  const error = (message: string, options?: ToastOptions) => {
    return notify(message, {
      bgClasses:
        "bg-danger-200 dark:bg-danger-950 border-danger-300 dark:border-danger-900",
      icon: "mdi:alert",
      iconClasses: "text-danger-500",
      ...options,
    })
  }

  const success = (message: string, options?: ToastOptions) => {
    return notify(message, {
      bgClasses:
        "bg-success-200 dark:bg-success-950 border-success-300 dark:border-success-900",
      icon: "mdi:check-circle",
      iconClasses: "text-success-500",
      ...options,
    })
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    info,
    warning,
    error,
    success,
    removeToast,
  }
}
