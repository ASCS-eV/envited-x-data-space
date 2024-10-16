'use client'

import {
  Card,
  Checkboxes,
  DragAndDropField,
  Heading,
  LoadingIndicator,
  SelectField,
  TextField,
  TextareaField,
} from '@envited-marketplace/design-system'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  append,
  chain,
  dissoc,
  equals,
  findIndex,
  includes,
  isEmpty,
  isNil,
  pathOr,
  prop,
  propEq,
  propOr,
  reject,
} from 'ramda'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { Profile as ProfileType, User } from '../../common/types'
import { getImageUrl, mapIndexed } from '../../common/utils'
import { updateProfileForm } from './Profile.actions'
import { ProfileSchema } from './Profile.schema'

interface BusinessCategories {
  profileId: string
  businessCategoryId: string
}
interface Profiles extends ProfileType {
  businessCategories: BusinessCategories[]
}
interface ProfileProps {
  profile: Profiles
  businessCategories: any[]
  users: User[]
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
  salesContact: string
  salesName: string
  salesPhone: string
  salesEmail: string
  principalUserId: string
  principalName: string
  principalPhone: string
  principalEmail: string
  website: string
  businessCategories: string[]
  offerings: OfferingItem[] | []
}

export const Profile: FC<ProfileProps> = ({ profile, businessCategories, users }) => {
  const { t } = useTranslation('Profile')
  const { error, success } = useNotification()
  const availableUsers = [
    {
      id: '',
      name: 'Select a user',
    },
    ...users,
  ]

  const [isOpen, setIsOpen] = useState<boolean>(isEmpty(propOr('', 'logo')(profile)))
  const { name, logo } = profile

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
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
      salesEmail: propOr('', 'salesEmail')(profile),
      principalUserId: propOr('', 'principalUserId')(profile),
      principalName: propOr('', 'principalName')(profile),
      principalPhone: propOr('', 'principalPhone')(profile),
      principalEmail: propOr('', 'principalEmail')(profile),
      website: propOr('', 'website')(profile),
      businessCategories: !isNil(profile?.businessCategories)
        ? (chain(prop('businessCategoryId'))(profile?.businessCategories as any) as string[])
        : [],
      offerings: propOr([], 'offerings')(profile),
    },
    mode: 'onChange',
  })

  const handleCheckbox = (checkId: string) => {
    const { businessCategories: ids } = getValues()

    return includes(checkId)(ids) ? reject(equals(checkId))(ids) : append(checkId)(ids)
  }

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
      const formData = new FormData()

      if (data.file) {
        formData.append('file', data.file)
      }

      formData.append('data', JSON.stringify(dissoc('file')(data)))

      await updateProfileForm(formData)
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
                  rules={{ required: true }}
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
                  name="businessCategories"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, value, ...field } }) => (
                    <Checkboxes
                      label={t('[Label] business categories')}
                      description={t('[Description] business categories')}
                      inputRef={ref}
                      items={businessCategories}
                      values={value}
                      handleCheckbox={handleCheckbox}
                      {...field}
                      error={pathOr('', ['businessCategories', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  {t('[Label] logo')}
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {!isEmpty(logo) && (
                    <img src={getImageUrl(logo)} alt={`Logo - ${name}`} className="h-20 w-20 object-contain" />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(!isOpen)
                    }}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {!isEmpty(logo) ? t('[Button] change') : t('[Button] add logo')}
                  </button>
                </div>
                {isOpen && (
                  <Controller
                    name="file"
                    control={control}
                    render={({ field: { ref, onChange, value, ...field } }) => (
                      <DragAndDropField
                        label={t('[Label] select new logo')}
                        description={t('[Description] select new logo')}
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
                )}
              </div>

              <div className="sm:col-span-full">
                <Controller
                  name="website"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] website')}
                      description={t('[Description] website')}
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

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6 sm:col-start-1">
                <Controller
                  name="principalUserId"
                  control={control}
                  render={({ field: { ref, onChange, value, ...field } }) => (
                    <SelectField
                      label={'Select a user'}
                      selected={
                        isEmpty(value)
                          ? availableUsers[0]
                          : availableUsers[findIndex(propEq(value, 'id'))(availableUsers)]
                      }
                      options={availableUsers}
                      inputRef={ref}
                      onChange={id => {
                        if (!isEmpty(id)) {
                          const selected = availableUsers[findIndex(propEq(id, 'id'))(availableUsers)]
                          onChange(id)
                          setValue('principalName', selected.name)
                          setValue('principalEmail', propOr('', 'email')(selected))
                        }
                      }}
                      {...field}
                      error={pathOr('', ['principalUserId', 'message'])(errors)}
                    />
                  )}
                />
              </div>
              <div className="sm:col-span-3 sm:col-start-1">
                <Controller
                  name="principalName"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] name')}
                      inputRef={ref}
                      disabled
                      {...field}
                      error={pathOr('', ['principalName', 'message'])(errors)}
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-3">
                <Controller
                  name="principalEmail"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] email')}
                      inputRef={ref}
                      disabled
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

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="sm:col-span-2">
                <Controller
                  name="salesEmail"
                  control={control}
                  // rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label={t('[Label] sales email')}
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
                          description={t('[Description] offering name')}
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
                          description={t('[Description] offering type')}
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
                        <TextareaField
                          label={t('[Label] offering functionalities')}
                          description={t('[Description] offering functionalities')}
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
            className="bg-blue hover:bg-blue-900 text-white transition rounded-md font-bold py-2 px-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingIndicator /> : t('[Button] update profile')}
          </button>
        </div>
      </form>
    </Card>
  )
}
