'use client'

import { Heading, LoadingIndicator } from '@envited-marketplace/design-system'
import { pathOr } from 'ramda'
import { Controller, useForm } from 'react-hook-form'

import { removeFileHandler } from './AddAssets.utils'
import { UploadAssetsField } from './UploadAssetsField'

export const AddAssets = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const addAssetsAction = () => {}

  return (
    <>
      <div className="flex justify-between mb-6 pb-6 border-b">
        <Heading importance="h3">Add assets</Heading>
      </div>
      <form onSubmit={handleSubmit(addAssetsAction)} className="pt-6">
        <Controller
          name="assets"
          control={control}
          render={({ field: { ref, onChange, value, ...field } }) => (
            <UploadAssetsField
              label="Select assets"
              {...field}
              inputRef={ref}
              files={value}
              onDrop={event => {
                if (event.dataTransfer.files.length > 0) {
                  onChange(event.dataTransfer.files)
                }
              }}
              onChange={event => {
                if (event.target.files) {
                  onChange(event.target.files)
                }
              }}
              removeFile={(idx: number) => {
                onChange(removeFileHandler(value, idx))
              }}
              error={pathOr('', ['assets', 'message'])(errors)}
            />
          )}
        />
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="bg-blue hover:bg-blue-900 text-white transition rounded-full font-bold py-2 px-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingIndicator /> : 'Upload assets'}
          </button>
        </div>
      </form>
    </>
  )
}
