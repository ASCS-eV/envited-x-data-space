'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import crypto from 'crypto'
import { Bucket } from 'sst/node/bucket'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { log } from '../../common/logger'
import { updateProfile } from '../../common/serverActions/profiles'
import { badRequestError, formatError, internalServerErrorError } from '../../common/utils'
import { ProfileSchema, ValidateProfileForm } from './Profile.schema'
// import { uploadBucketUrl } from '../../common/aws'

type ProfileForm = z.infer<typeof ProfileSchema>

export async function updateProfileForm(data: ProfileForm) {
  try {
    const result = ValidateProfileForm(data)

    if (!result.success) {
      throw badRequestError({
        resource: 'profiles',
        resourceId: data.name,
        message: 'Profile validate form data failed',
      })
    }

    if (data.file) {
      const command = new PutObjectCommand({
        ACL: 'public-read',
        Key: crypto.randomUUID(),
        Bucket: Bucket.public.bucketName,
      })
      const url = await getSignedUrl(new S3Client({}), command)

      const file = data.file
      const image = await fetch(url, {
        body: file,
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Content-Disposition': `attachment; filename="${file.name}"`,
        },
      })

      data = {
        ...data,
        logo: image.url.split('?')[0],
      }
    }

    console.log(data)
    // await updateProfile(data)

    revalidatePath('/dashboard/profile')
  } catch (error: unknown) {
    log.error(formatError(error))
    throw internalServerErrorError()
  }
}
