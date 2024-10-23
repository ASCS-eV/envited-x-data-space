import { eq } from 'drizzle-orm'
import { omit } from 'ramda'

import { Upload, UploadStatus } from '../../types'
import { upload } from '../schema'
import { DatabaseConnection } from '../types'

export const getUploadsByUserId = (db: DatabaseConnection) => async (userId: string) =>
  db.select().from(upload).where(eq(upload.userId, userId))

export const getUpload = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(upload).where(eq(upload.id, id))

export const getUploads = (db: DatabaseConnection) => async () => db.select().from(upload)

export const getUploadByCID = (db: DatabaseConnection) => async (cid: string) =>
  db.select().from(upload).where(eq(upload.cid, cid))

export const insertUpload = (db: DatabaseConnection) => async (userId: string, cid: string) =>
  db
    .insert(upload)
    .values({
      cid,
      metadata: '',
      status: UploadStatus.processing,
      userId,
    })
    .returning()

export const updateUpload = (db: DatabaseConnection) => async (data: Upload) =>
  db
    .update(upload)
    .set({
      ...omit(['id', 'userId'])(data),
    })
    .where(eq(upload.cid, data.cid))
    .returning()

export const updateUploadCID = (db: DatabaseConnection) => async (data: Upload, cid: string) =>
  db
    .update(upload)
    .set({
      ...omit(['id', 'userId'])(data),
    })
    .where(eq(upload.cid, cid))
    .returning()
