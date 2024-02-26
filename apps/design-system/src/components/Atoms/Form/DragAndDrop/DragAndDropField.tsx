import { PhotoIcon } from '@heroicons/react/24/outline'
import { isEmpty } from 'ramda'
import { FC, JSXElementConstructor, ReactElement, useState } from 'react'
import { RefCallBack } from 'react-hook-form'

interface DragAndDropFieldProps {
  label: string | ReactElement<any, string | JSXElementConstructor<any>>
  name: string
  value: any
  error?: string
  inputRef: RefCallBack
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const DragAndDropField: FC<DragAndDropFieldProps> = ({
  label,
  name,
  value,
  error = '',
  inputRef,
  onDrop,
  onChange,
}) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragActive(false)
    onDrop(event)
  }

  const handleDragEnter = () => {
    setIsDragActive(true)
  }

  const handleDragLeave = () => {
    setIsDragActive(false)
  }

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
        {label}
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:bg-white/5 dark:text-white dark:border-gray-300/25 dark:hover:bg-white/10 dark:hover:border-gray-300/50 focus:dark:ring-gray-200 text-gray-900 transition
        ${isDragActive ? 'bg-blue/20 border-blue/80' : ''}`}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={event => event.preventDefault()}
      >
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
            <label
              htmlFor={name}
              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-black dark:text-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-blue-800"
            >
              <span>Upload a file</span>
              <input
                id={name}
                name={name}
                type="file"
                onChange={onChange}
                ref={inputRef}
                accept="image/png, image/jpeg"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {value}
      {!isEmpty(error) && <p className="mt-3 text-sm leading-6 text-red-600 dark:text-red-400">{error}</p>}
    </>
  )
}
