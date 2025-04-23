import { main as processAssetUpload } from './'

const s3Event = {
  Records: [
    {
      s3: {
        object: {
          key: 'bafkreif7ewbwgnl757vuwufo7mzcp6n7qpkroc5z65otvmb3qeohzamigy',
        },
        bucket: {
          name: 'staging-envited-x-data-space--assetsbucket5f3b285a-jajxd4n1z8k2',
        },
      },
    },
  ],
}

processAssetUpload(s3Event as any, {} as any, {} as any)?.then(() => {
  console.log('done')
})
