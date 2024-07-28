export interface ToastOptions {
  bgClasses?: string
  icon?: string
  iconClasses?: string
  timeoutMs?: number
  title?: string
}

export interface Toast extends ToastOptions {
  id: number
  message: string
}

export type ToastPosition =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
