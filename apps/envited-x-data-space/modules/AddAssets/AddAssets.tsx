'use client'

import { Alert, AlertType, Heading } from '@envited-x-data-space/design-system'
import { isEmpty, isNil, map, pathOr, pipe } from 'ramda'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { FilesWithId, UploadAssetState, UploadStatus } from '../../common/types'
import { allTrue, anyFalse } from '../../common/utils'
import { AssetFile, validateAndUploadAssets } from './AddAssets.actions'
import {
  addFiles,
  addIdToFileList,
  allStatus,
  anyStatus,
  createDataTransferFromFileList,
  processFile,
  removeFile,
  uploadFileToIPFS,
} from './AddAssets.utils'
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
  const [uploadAssetsState, setUploadAssetsState] = useState<UploadAssetState[]>([])
  const [uploadFileToIPFSs, setUploadFiles] = useState<FilesWithId[]>([])

  const validationHandler = (idx: number, data: { isValid: boolean; data: any }) => {
    selectedAssetsValidationResults[idx] = data.isValid
    setValue('allAssetsValid', allTrue(selectedAssetsValidationResults))
    setSelectedAssetsValidationResults(selectedAssetsValidationResults)
  }

  const updateUploadState = (index: number, progress: number, status: UploadStatus) => {
    setUploadAssetsState(prev => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        progress,
        status,
      }

      return updated
    })
  }

  const { allAssetsValid } = getValues()

  const addAssetsAction: SubmitHandler<any> = async data => {
    try {
      if (isEmpty(data.assets)) {
        return error(t('[Notification] no assets selected'))
      }

      const filesArray = Array.from(data.assets as FileList)

      filesArray.forEach((_, index) => {
        updateUploadState(index, 0, UploadStatus.queued)
      })

      const processFiles = pipe(map(processFile), Promise.all.bind(Promise))
      const filesData = await processFiles(filesArray)
      const uploadData = await validateAndUploadAssets(filesData as AssetFile[])

      const uploadPromises = uploadData.map(async (file, index) => {
        try {
          if (!file.success) {
            updateUploadState(index, 0, UploadStatus.error)
            return error(`${filesArray[index].name}: ${file.message}`)
          }

          const { success, message } = await uploadFileToIPFS(filesArray, file, percent => {
            updateUploadState(index, percent, UploadStatus.uploading)
          })

          if (!success) {
            updateUploadState(index, 0, UploadStatus.error)
            return error(`${filesArray[index].name}: ${message}`)
          }

          updateUploadState(index, 100, UploadStatus.uploaded)
          successNotification(`${filesArray[index].name} successfully uploaded`)
        } catch (err) {
          error(`Upload failed for ${file}`)
        }
      })
      await Promise.all(uploadPromises)

      reset()
      setUploadFiles([])
      setUploadAssetsState([])
      setSelectedAssetsValidationResults([])
      setValue('allAssetsValid', false)
      setValue('assets', new DataTransfer().files)
    } catch (e) {
      error(t('[Notification] invalid asset found'))
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
              files={uploadFileToIPFSs}
              filesState={uploadAssetsState}
              onDrop={event => {
                if (event.dataTransfer.files.length === 0) {
                  return
                }

                const filesWithId = addFiles(value, event.dataTransfer.files)

                setUploadFiles(addIdToFileList(filesWithId))
                onChange(createDataTransferFromFileList(filesWithId))
              }}
              onChange={event => {
                if (!event.target.files) {
                  return
                }

                const filesWithId = addFiles(value, event.target.files)

                setUploadFiles(addIdToFileList(filesWithId))
                onChange(createDataTransferFromFileList(filesWithId))
                event.target.value = ''
              }}
              removeFile={(idx: number) => {
                setUploadFiles(prev => prev.filter((_, index) => index !== idx))
                selectedAssetsValidationResults.splice(idx, 1)
                setSelectedAssetsValidationResults([...selectedAssetsValidationResults])
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
            {allAssetsValid && !isSubmitting && (
              <button
                type="submit"
                className="bg-blue hover:bg-blue-900 text-white transition rounded-md font-bold py-2 px-4 w-full text-center"
              >
                {t('[Button] upload assets')}
              </button>
            )}
            {anyFalse(selectedAssetsValidationResults) && (
              <Alert type={AlertType.error}>{t('[Error] invalid asset found')}</Alert>
            )}
          </div>
        )}
        {isSubmitted && allStatus(UploadStatus.uploaded)(uploadAssetsState) && (
          <Alert type={AlertType.succes}>{t('[Success] assets are uploaded')}</Alert>
        )}
        {isSubmitted && anyStatus(UploadStatus.error)(uploadAssetsState) && (
          <Alert type={AlertType.error}>{t('[Error] assets upload failed')}</Alert>
        )}
      </form>
    </>
  )
}
