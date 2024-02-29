import { JSXElementConstructor, ReactElement } from 'react'
import { toast } from 'react-toastify'

export const notification = (notify: typeof toast) => () => {
  const info = (content: string | ReactElement<any, string | JSXElementConstructor<any>>) => notify.info(content)

  const success = (content: string | ReactElement<any, string | JSXElementConstructor<any>>) => notify.success(content)

  const error = (content: string | ReactElement<any, string | JSXElementConstructor<any>>) => notify.error(content)

  const warning = (content: string | ReactElement<any, string | JSXElementConstructor<any>>) => notify.warning(content)

  return { info, success, error, warning }
}

export const useNotification = notification(toast)
