'use client'

import { Alert, AlertType, Heading, LoadingIndicator } from '@envited-x-data-space/design-system'
import { ERRORS } from 'apps/envited-x-data-space/common/constants'
import { isEmpty, isNil, map, pathOr, pipe, propEq, times } from 'ramda'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { createFilename } from '../../common/asset/utils'
import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { allTrue } from '../../common/utils/utils'
import { AssetFile, insertAssetAfterUpload, validateAndUploadAssets } from './AddAssets.actions'
import { addFiles, processFile, removeFile, uploadFile } from './AddAssets.utils'
import { UploadAssetsField } from './UploadAssetsField'

export const AddAssets = () => {
  const { t } = useTranslation('AddAssets')
  const { error, success: successNotification } = useNotification()

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

  /*
  const addAssetsAction: SubmitHandler<any> = async data => {
    try {
      const formData = new FormData()

      if (data.assets) {
        times(idx => formData.append('assets', data.assets[idx]))(data.assets.length)
      }

      const results = await validateAndUploadAssets(formData)

      map(({ success, file }: { success: boolean; file: string }) =>
        success
          ? successNotification(`${file} ${t('[Notification] asset successfully uploaded')}`)
          : error(`${file} ${t('[Notification] asset already exist')}`),
      )(results)
      reset()
    } catch (e) {
      error(t('[Notification] invalid asset found'))
      console.log(e)
    }
  }
  */

  const addAssetsAction: SubmitHandler<any> = async data => {
    try {
      /*
      if (isEmpty(data.assets)) throw new Error('No files selected')

        const filesArray = Array.from(data.assets as FileList)
    
        const processFiles = pipe(map(processFile), Promise.all.bind(Promise))
        const filesData = await processFiles(filesArray)
        const uploadData = await validateAndUploadAssets(filesData as AssetFile[])
        const uploadResults = await Promise.all(map(file => uploadFile(filesArray, file), uploadData))
    
        map(({ success, file }: { success: boolean; file: string }) =>
          success ? successNotification(`${file} successfully uploaded`) : error(`${file} already exists`))(uploadResults)
    
        reset()
        */
      if (!data.assets || data.assets.length === 0) {
        throw new Error('No files selected')
      }

      const filesArray = Array.from(data.assets as FileList)

      const filesData = await Promise.all(
        filesArray.map(async file => {
          const arrayBuffer = Buffer.from(await file.arrayBuffer())
          const cid = await createFilename(arrayBuffer)

          return {
            name: file.name,
            type: file.type,
            cid,
          }
        }),
      )

      console.log({ filesData })
      const uploadData = await validateAndUploadAssets(filesData)

      const uploadResults = await Promise.all(
        uploadData.map(async ({ signedUrl, cid, fileType, file }) => {
          if (!signedUrl) {
            return {
              success: false,
              file,
              message: ERRORS.SIGNED_URL_MISSING,
            }
          }

          const fileObj = filesArray.find((f: File) => propEq(file, 'name')(f))
          if (!fileObj) {
            return {
              success: false,
              file,
              message: ERRORS.FILE_NOT_FOUND,
            }
          }

          const arrayBuffer = Buffer.from(await fileObj.arrayBuffer())

          const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: arrayBuffer,
            headers: {
              'Content-Type': fileType,
            },
          })

          if (!uploadResponse.ok) {
            return {
              success: false,
              file,
              message: ERRORS.FAILED_UPLOAD,
            }
          }

          await insertAssetAfterUpload(cid, file)

          return { success: true, file }
        }),
      )

      uploadResults.forEach(({ success, file }) =>
        success ? successNotification(`${file} successfully uploaded`) : error(`${file} already exists`),
      )

      reset()
    } catch (e) {
      error('Invalid asset found')
      console.error(e)
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
