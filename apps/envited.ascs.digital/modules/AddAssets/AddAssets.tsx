'use client'

import { Alert, AlertType, Heading, LoadingIndicator } from '@envited-x-data-space/design-system'
import { isEmpty, isNil, pathOr, times } from 'ramda'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useTranslation } from '../../common/i18n'
import { allTrue } from '../../common/utils/utils'
import { addAssetsForm } from './AddAssets.actions'
import { addFiles, removeFile } from './AddAssets.utils'
import { UploadAssetsField } from './UploadAssetsField'

export const AddAssets = () => {
  const { t } = useTranslation('AddAssets')

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm()

  watch('allAssetsValid')

  const [selectedAssetsValidationResults, setSelectedAssetsValidationResults] = useState<boolean[]>([])

  const validationHandler = (idx: number, data: { isValid: boolean; data: any }) => {
    selectedAssetsValidationResults[idx] = data.isValid
    setValue('allAssetsValid', allTrue(selectedAssetsValidationResults))
    setSelectedAssetsValidationResults(selectedAssetsValidationResults)
  }

  const { allAssetsValid } = getValues()

  const addAssetsAction: SubmitHandler<any> = async data => {
    try {
      const formData = new FormData()

      if (data.assets) {
        times(idx => formData.append('assets', data.assets[idx]))(data.assets.length)
      }

      await addAssetsForm(formData)

      reset()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="flex justify-between mb-6 pb-6 border-b">
        <Heading importance="h3">{t('[Heading] add assets')}</Heading>
      </div>
      <form onSubmit={handleSubmit(addAssetsAction)} className="pt-6">
        <Controller
          name="assets"
          control={control}
          render={({ field: { ref, onChange, value, ...field } }) => (
            <UploadAssetsField
              label={t('[Label] select assets')}
              {...field}
              inputRef={ref}
              files={value}
              onDrop={event => {
                if (event.dataTransfer.files.length > 0) {
                  onChange(value ? addFiles(value, event.dataTransfer.files) : event.dataTransfer.files)
                }
              }}
              onChange={event => {
                if (event.target.files) {
                  onChange(value ? addFiles(value, event.target.files) : event.target.files)
                }
              }}
              removeFile={(idx: number) => {
                selectedAssetsValidationResults.splice(idx, 1)
                setSelectedAssetsValidationResults(selectedAssetsValidationResults)
                setValue('allAssetsValid', allTrue(selectedAssetsValidationResults))
                onChange(removeFile(value, idx))
              }}
              validationHandler={validationHandler}
              error={pathOr('', ['assets', 'message'])(errors)}
            />
          )}
        />
        {!isEmpty(selectedAssetsValidationResults) && !isNil(allAssetsValid) && (
          <div>
            {allAssetsValid ? (
              <button
                type="submit"
                className="bg-blue hover:bg-blue-900 text-white transition rounded-md font-bold py-2 px-4 w-full text-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <LoadingIndicator />
                  </span>
                ) : (
                  t('[Button] upload assets')
                )}
              </button>
            ) : (
              <Alert type={AlertType.error}>{t('[Error] invalid asset found')}</Alert>
            )}
          </div>
        )}
        {isSubmitted && isNil(allAssetsValid) && (
          <Alert type={AlertType.succes}>{t('[Success] assets are uploaded')}</Alert>
        )}
      </form>
    </>
  )
}
