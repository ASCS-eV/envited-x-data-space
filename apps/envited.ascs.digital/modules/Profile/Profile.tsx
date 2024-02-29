'use client'

import { Card, DragAndDropField, Heading, TextField, TextareaField } from '@envited-marketplace/design-system'
import { zodResolver } from '@hookform/resolvers/zod'
import { pathOr, prop, propOr } from 'ramda'
import { FC } from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { File, Profile as ProfileType } from '../../common/types'
import { mapIndexed } from '../../common/utils'
import { updateProfileForm } from './Profile.actions'
import { ProfileSchema } from './Profile.schema'

interface ProfileProps {
  profile: ProfileType
  memberCategories: any[]
}

interface OfferingItem {
  name: string
  type: string
  functionalities: string
  supportedTools: string
  supportedStandards: string
}

type ProfileInputs = {
  name: string
  description: string
  logo: string
  file: File
  streetAddress: string
  postalCode: string
  addressLocality: string
  addressCountry: string
  salesName: string
  salesPhone: string
  salesEmail: string
  principalName: string
  principalPhone: string
  principalEmail: string
  website: string
  offerings: OfferingItem[] | []
}

export const Profile: FC<ProfileProps> = ({ profile, memberCategories }) => {
  const { t } = useTranslation('Profile')
  const { error, success } = useNotification()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInputs>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: prop('name')(profile),
      description: propOr('', 'description')(profile),
      logo: propOr('', 'logo')(profile),
      streetAddress: propOr('', 'streetAddress')(profile),
      postalCode: propOr('', 'postalCode')(profile),
      addressLocality: propOr('', 'addressLocality')(profile),
      addressCountry: propOr('', 'addressCountry')(profile),
      salesName: propOr('', 'salesName')(profile),
      salesPhone: propOr('', 'salesPhone')(profile),
      salesEmail: propOr('', 'salesEmail')(profile),
      principalName: propOr('', 'principalName')(profile),
      principalPhone: propOr('', 'principalPhone')(profile),
      principalEmail: propOr('', 'principalEmail')(profile),
      website: propOr('', 'website')(profile),
      offerings: propOr([], 'offerings')(profile),
    },
    mode: 'onChange',
  })

  const {
    fields: offeringFields,
    append: appendOffering,
    remove: removeOffering,
  } = useFieldArray({
    control,
    name: 'offerings',
  })

  const updateProfileAction: SubmitHandler<ProfileInputs> = async data => {
    try {
      await updateProfileForm(data)
      success(t('[Status] profile is updated'))
    } catch (e) {
      error(t('[Status] something wrong'))
    }
  }

  return (
    <Card>
      <Heading importance="h3">{t('[Heading] profile')}</Heading>
      <form onSubmit={handleSubmit(updateProfileAction)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 dark:border-white/10 pb-12">
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{t('[Description] profile')}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField label={t('[Label] company name')} disabled={true} inputRef={ref} {...field} />
                  )}
                />
              </div>

              <div className="col-span-full">
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextareaField
                      label={t('[Label] about')}
                      description={t('[Label] about description')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['description', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="col-span-full">
                <Controller
                  name="logo"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] logo')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['logo', 'message'])(errors)}
                    />
                  )}
                />
                {/*
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { ref, onChange, value, ...field } }) => (
                    <FileField
                      label="File"
                      {...field}
                      inputRef={ref}
                      value={value?.name}
                      onChange={event => {
                        if (event.target.files) {
                          onChange(event.target.files?.[0])
                        }
                      }}
                      error={pathOr('', ['file', 'message'])(errors)}
                    />
                  )}
                />
                */}
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { ref, onChange, value, ...field } }) => (
                    <DragAndDropField
                      label="File"
                      {...field}
                      inputRef={ref}
                      value={value?.name}
                      onDrop={event => {
                        if (event.dataTransfer.files.length > 0) {
                          onChange(event.dataTransfer.files?.[0])
                        }
                      }}
                      onChange={event => {
                        if (event.target.files) {
                          onChange(event.target.files?.[0])
                        }
                      }}
                      error={pathOr('', ['file', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-full">
                <Controller
                  name="website"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] website')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['website', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="col-span-full">
                <Controller
                  name="streetAddress"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField label={t('[Label] street')} disabled={true} inputRef={ref} {...field} />
                  )}
                />
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField label={t('[Label] postal code')} disabled={true} inputRef={ref} {...field} />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <Controller
                  name="addressLocality"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField label={t('[Label] city')} disabled={true} inputRef={ref} {...field} />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <Controller
                  name="addressCountry"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField label={t('[Label] country')} disabled={true} inputRef={ref} {...field} />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 dark:border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              {t('[Heading] principal contact')}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {t('[Description] principal contact')}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <Controller
                  name="principalName"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] name')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['principalName', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <Controller
                  name="principalPhone"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] phone')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['principalPhone', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <Controller
                  name="principalEmail"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] email')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['principalEmail', 'message'])(errors)}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 dark:border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              {t('[Heading] sales contact')}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {t('[Description] sales contact')}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <Controller
                  name="salesName"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] name')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['salesName', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <Controller
                  name="salesPhone"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] phone')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['salesPhone', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <Controller
                  name="salesEmail"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] email')}
                      inputRef={ref}
                      {...field}
                      error={pathOr('', ['salesEmail', 'message'])(errors)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 dark:border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              {t('[Heading] offerings')}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{t('[Description] offerings')}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              {mapIndexed((field: any, index: number) => (
                <div key={field.id} className="border-t">
                  <div className="flex justify-between py-4">
                    <h3 className="font-bold text-gray-400">
                      {t('[Label] offering')} {index + 1}
                    </h3>
                    <button
                      type="button"
                      className="underline text-blue-800 hover:text-blue-900"
                      onClick={() => removeOffering(index)}
                    >
                      {t('[Button] remove')}
                    </button>
                  </div>
                  <div className="pt-4">
                    <Controller
                      name={`offerings.${index}.name`}
                      control={control}
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          label={t('[Label] offering name')}
                          inputRef={ref}
                          {...field}
                          error={pathOr('', ['offerings', index, 'name', 'message'])(errors)}
                        />
                      )}
                    />
                  </div>
                  <div className="pt-4">
                    <Controller
                      name={`offerings.${index}.type`}
                      control={control}
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          label={t('[Label] offering type')}
                          inputRef={ref}
                          {...field}
                          error={pathOr('', ['offerings', index, 'type', 'message'])(errors)}
                        />
                      )}
                    />
                  </div>
                  <div className="pt-4">
                    <Controller
                      name={`offerings.${index}.functionalities`}
                      control={control}
                      render={({ field: { ref, ...field } }) => (
                        <TextField
                          label={t('[Label] offering functionalities')}
                          inputRef={ref}
                          {...field}
                          error={pathOr('', ['offerings', index, 'functionalities', 'message'])(errors)}
                        />
                      )}
                    />
                  </div>
                  <div className="pt-4">
                    <Controller
                      name={`offerings.${index}.supportedTools`}
                      control={control}
                      render={({ field: { ref, ...field } }) => (
                        <TextareaField
                          label={t('[Label] offering supported tools')}
                          description={t('[Description] offering supported tools')}
                          inputRef={ref}
                          {...field}
                          error={pathOr('', ['offerings', index, 'supportedTools', 'message'])(errors)}
                        />
                      )}
                    />
                  </div>
                  <div className="pt-4">
                    <Controller
                      name={`offerings.${index}.supportedStandards`}
                      control={control}
                      render={({ field: { ref, ...field } }) => (
                        <TextareaField
                          label={t('[Label] offering supported standards')}
                          description={t('[Description] offering supported standards')}
                          inputRef={ref}
                          {...field}
                          error={pathOr('', ['offerings', index, 'supportedStandards', 'message'])(errors)}
                        />
                      )}
                    />
                  </div>
                </div>
              ))(offeringFields)}
              {offeringFields.length < 5 && (
                <button
                  type="button"
                  className="underline text-blue-800 hover:text-blue-900"
                  onClick={() =>
                    appendOffering({
                      name: '',
                      type: '',
                      functionalities: '',
                      supportedTools: '',
                      supportedStandards: '',
                    })
                  }
                >
                  {t('[Button] add further offerings')}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="bg-blue hover:bg-blue-900 text-white transition rounded-full font-bold py-2 px-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingIndicator /> : t('[Button] update profile')}
          </button>
        </div>
      </form>
    </Card>
  )
}
