import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { isEmpty, map } from 'ramda'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import { RefCallBack } from 'react-hook-form'

interface SelectItem {
  id: string
  name: string
}

interface SelectFieldProps {
  label: string | ReactElement<any, string | JSXElementConstructor<any>>
  name: string
  selected: Partial<SelectItem> | SelectItem
  options: SelectItem[]
  description?: string | ReactElement<any, string | JSXElementConstructor<any>>
  error?: string
  inputRef: RefCallBack
  onChange: (id: any) => any
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  selected,
  options,
  description = '',
  error = '',
  inputRef,
  onChange,
}) => {
  return (
    <>
      <Listbox value={selected} onChange={onChange}>
        <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">{label}</Label>
        <div className="relative mt-2">
          <ListboxButton
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left dark:bg-white/5 dark:text-white dark:ring-white/10 focus:dark:ring-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            ref={inputRef}
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {map(({ id, name }: { id: string; name: string }) => (
              <ListboxOption
                key={id}
                value={id}
                className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-gray-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">{name}</span>

                <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))(options)}
          </ListboxOptions>
        </div>
      </Listbox>
      {!isEmpty(error) && <p className="mt-3 text-sm leading-6 text-red-600 dark:text-red-400">{error}</p>}
      {!isEmpty(description) && (
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </>
  )
}
