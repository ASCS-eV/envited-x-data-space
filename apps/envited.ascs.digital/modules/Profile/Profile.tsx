'use client'

import {
  Card,
  Checkboxes,
  DragAndDropField,
  Heading,
  LoadingIndicator,
  TextField,
  TextareaField,
} from '@envited-marketplace/design-system'
import { zodResolver } from '@hookform/resolvers/zod'
import { append, equals, includes, pathOr, prop, propOr, reject } from 'ramda'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { File, Profile as ProfileType } from '../../common/types'
import { updateProfileForm } from './Profile.actions'
import { ProfileSchema } from './Profile.schema'

interface ProfileProps {
  profile: ProfileType
  memberCategories: any[]
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
  offerings: []
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
      offerings: [],
    },
    mode: 'onChange',
  })

  const handleCheckbox = (checkId: string) => {
    const { offerings: ids } = getValues()

    return includes(checkId)(ids) ? reject(equals(checkId))(ids) : append(checkId)(ids)
  }

  const updateProfileAction: SubmitHandler<ProfileInputs> = async data => {
    // return new Promise(resolve => setTimeout(resolve, 2000))

    try {
      await updateProfileForm(data)
      success('Profile is updated')
    } catch (e) {
      error('Something went wrong')
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
                  name="offerings"
                  control={control}
                  render={({ field: { ref, value, ...field } }) => (
                    <Checkboxes
                      label={t('[Label] offerings')}
                      inputRef={ref}
                      items={memberCategories}
                      values={value}
                      handleCheckbox={handleCheckbox}
                      {...field}
                      error={pathOr('', ['offerings', 'message'])(errors)}
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
