import { isEmpty } from 'ramda'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import { RefCallBack } from 'react-hook-form'

interface TextFieldProps {
  label: string | ReactElement<any, string | JSXElementConstructor<any>>
  name: string
  value: string
  description?: string
  error?: string
  disabled?: boolean
  inputRef: RefCallBack
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField: FC<TextFieldProps> = ({
  label,
  name,
  value,
  description = '',
  error = '',
  disabled = false,
  inputRef,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id={name}
          defaultValue={value}
          disabled={disabled}
          onChange={onChange}
          ref={inputRef}
          className="block w-full rounded-md border-0 py-1.5 px-3 dark:bg-white/5 dark:text-white dark:ring-white/10 focus:dark:ring-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 dark:disabled:text-gray-600 disabled:text-gray-400"
        />
      </div>
      {!isEmpty(error) && <p className="mt-3 text-sm leading-6 text-red-600 dark:text-red-400">{error}</p>}
      {!isEmpty(description) && (
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </>
  )
}
