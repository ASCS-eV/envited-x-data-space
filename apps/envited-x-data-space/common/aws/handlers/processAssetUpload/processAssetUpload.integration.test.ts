import { main as processAssetUpload } from './'

const s3Event = {
  Records: [
    {
      s3: {
        object: {
          key: process.env.ASSET_KEY,
        },
        bucket: {
          name: process.env.ASSET_BUCKET_NAME,
        },
      },
    },
  ],
}

processAssetUpload(s3Event as any, {} as any, {} as any)?.then(() => {
  console.log('done')
})
