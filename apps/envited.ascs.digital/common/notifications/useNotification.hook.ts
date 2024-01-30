import { toast } from 'react-toastify'

// export const notification = (notify: typeof toast) => {
export const useNotification = () => {
  const info = (content: string) => toast(content)

  const success = (content: string) => toast.success(content)

  const error = (content: string) => toast.error(content)

  const warning = (content: string) => toast.warning(content)

  return { info, success, error, warning }
}

// export const useNotification = notification(toast)
