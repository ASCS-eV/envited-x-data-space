import { includes, isEmpty, map } from 'ramda'
import { ChangeEvent, FC, JSXElementConstructor, ReactElement } from 'react'
import { RefCallBack } from 'react-hook-form'

interface CheckboxItem {
  id: string
  name: string
  description: string
}

interface CheckboxProps {
  name: string
  values: string[]
  label: string | ReactElement<any, string | JSXElementConstructor<any>>
  description?: string | ReactElement<any, string | JSXElementConstructor<any>>
  error?: string
  inputRef: RefCallBack
  handleCheckbox: (id: string) => any
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  items: CheckboxItem[]
}

export const Checkboxes: FC<CheckboxProps> = ({
  name,
  values = [],
  label,
  description = '',
  error = '',
  inputRef,
  handleCheckbox,
  onChange,
  items,
}) => (
  <>
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
      {label}
    </label>
    <div className="grid gap-4 grid-cols-3 mt-2">
      {map(({ id, name: itemName, description: itemDescription }: CheckboxItem) => (
        <div key={id} className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id={`${name}-${id}`}
              aria-describedby={`${name}-description`}
              name={name}
              value={id}
              onChange={() => onChange(handleCheckbox(id))}
              ref={inputRef}
              checked={includes(id)(values)}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor={`${name}-${id}`} className="font-medium leading-6 text-gray-900 dark:text-white">
              {itemName}
            </label>
          </div>
        </div>
      ))(items)}
    </div>
    {!isEmpty(description) && <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>}
    {!isEmpty(error) && <p className="mt-3 text-sm leading-6 text-red-600 dark:text-red-400">{error}</p>}
  </>
)
