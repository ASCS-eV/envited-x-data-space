import { toast } from 'react-toastify'

export const notification = (notify: typeof toast) => {
  const info = (content: string) => notify(content)

  const success = (content: string) => notify.success(content)

  const error = (content: string) => notify.error(content)

  const warning = (content: string) => notify.warning(content)

  return { info, success, error, warning }
}

export const useNotification = () => notification(toast)
