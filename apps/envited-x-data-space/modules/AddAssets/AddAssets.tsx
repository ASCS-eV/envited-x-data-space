'use client'

import { Alert, AlertType, Heading, LoadingIndicator } from '@envited-x-data-space/design-system'
import { isEmpty, isNil, map, pathOr, times } from 'ramda'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { createFilename } from '../../common/asset/utils'
import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { allTrue } from '../../common/utils/utils'
import { insertAssetAfterUpload, validateAndUploadAssets } from './AddAssets.actions'
import { addFiles, removeFile } from './AddAssets.utils'
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
      if (!data.assets || data.assets.length === 0) {
        throw new Error('No files selected')
      }

      // const formData = new FormData()

      // if (data.assets) {
      //   times(idx => formData.append('assets', data.assets[idx]))(data.assets.length)
      // }

      const filesArray = Array.from(data.assets as FileList)

      console.log('TEST', filesArray)

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

      console.log('AFTER', filesData)

      const uploadData = await validateAndUploadAssets(filesData)

      console.log({ uploadData })

      const uploadResults = await Promise.all(
        uploadData.map(async ({ signedUrl, cid, fileType, file }) => {
          if (!signedUrl) {
            return { success: false, file, reason: 'No signed URL' }
          }

          const fileObj = filesArray.find((f: File) => f.name === file)
          console.log({ fileObj })
          if (!fileObj) {
            return { success: false, file, reason: 'File not found' }
          }

          const arrayBuffer = Buffer.from(await fileObj.arrayBuffer())

          console.log('BEFORE uploadResponse', arrayBuffer)

          const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: arrayBuffer,
            headers: {
              'Content-Type': fileType,
              'Content-Disposition': `attachment; filename="${cid}"`,
            },
          })

          console.log('AFTER uploadResponse', uploadResponse)

          if (!uploadResponse.ok) {
            return { success: false, file, reason: 'Failed to upload to S3' }
          }

          console.log('before insertAssetAfterUpload')
          await insertAssetAfterUpload(cid, file)
          console.log('after insertAssetAfterUpload')

          return { success: true, file }
        }),
      )

      console.log('After uploadResults promise', uploadResults)

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
