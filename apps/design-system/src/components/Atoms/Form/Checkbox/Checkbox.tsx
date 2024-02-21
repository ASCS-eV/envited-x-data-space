import { isEmpty } from 'ramda'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import { RefCallBack } from 'react-hook-form'

interface CheckboxProps {
  name: string
  value?: string | number
  checked: boolean
  label: string | ReactElement<any, string | JSXElementConstructor<any>>
  description?: string
  inputRef: RefCallBack
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  name,
  value = '',
  checked,
  label,
  description = '',
  inputRef,
  onChange,
}) => {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={`${name}-${value}`}
          aria-describedby={`${name}-description`}
          name={name}
          value={value}
          onChange={onChange}
          ref={inputRef}
          checked={checked}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={`${name}-${value}`} className="font-medium leading-6 text-gray-900 dark:text-white">
          {label}
        </label>
        {!isEmpty(description) && (
          <p id={`${name}-${value}-description`} className="text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
