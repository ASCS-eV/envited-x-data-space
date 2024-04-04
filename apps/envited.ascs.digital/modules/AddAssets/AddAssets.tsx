'use client'

import { Heading, LoadingIndicator } from '@envited-marketplace/design-system'
import { all, equals, isEmpty, pathOr } from 'ramda'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { removeFileHandler } from './AddAssets.utils'
import { UploadAssetsField } from './UploadAssetsField'

export const AddAssets = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const [validatedFiles, setValidatedFiles] = useState<any[]>([])

  useEffect(() => {
    console.log('ValidatedFiles has been updated:', validatedFiles)
  }, [validatedFiles])

  const validationHandler = (idx: number, data: { isValid: boolean; data: any }) => {
    validatedFiles[idx] = data.isValid
    setValidatedFiles(validatedFiles)
  }

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
                validatedFiles.splice(idx, 1)
                setValidatedFiles(validatedFiles)
                onChange(removeFileHandler(value, idx))
              }}
              validationHandler={validationHandler}
              error={pathOr('', ['assets', 'message'])(errors)}
            />
          )}
        />
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!isEmpty(validatedFiles) && all(equals(true))(validatedFiles) ? (
            <button
              type="submit"
              className="bg-blue hover:bg-blue-900 text-white transition rounded-full font-bold py-2 px-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingIndicator /> : 'Upload assets'}
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  )
}
