module.exports = {
  apps: [
    {
      name: 'Listener',
      script: './apps/envited-x-data-space/listener/index.ts',
      watch: '.',
      env_staging: {
        ENV: 'staging',
        TEZOS_ASSETS_CONTRACT: 'KT1XC2fTBNqoafnrhEb7TuToRCzewgbHAhnA',
        TEZOS_CHAIN_ID: 'NetXnHfVqm9iesp',
        ASSET_BUCKET_NAME: 'staging-envited-x-data-space--assetsbucket5f3b285a-jajxd4n1z8k2',
        PUBLIC_ASSET_URL: 'https://d2ftpxn442yx6p.cloudfront.net',
        RDS_SECRET_ARN:
          'arn:aws:secretsmanager:eu-central-1:597778497612:secret:EnvitedSecretD661DE26-F2sAG4BoFy2s-ydkCoY',
        RDS_DB_NAME: 'envited',
        RDS_RESOURCE_ARN:
          'arn:aws:rds:eu-central-1:597778497612:cluster:staging-envited-x-data-space-envit-envited46e22b9b-86obows1tyha',
        PINATA_GATEWAY_KEY: 'yCNvt4_psrxde9cshtn7vPtK5HujxSUYaRyNT5aVIu1l5eH2S7pUxSEl7UVQhF-4',
        PINATA_GATEWAY: 'plum-secret-aardwolf-688.mypinata.cloud',
        PINATA_JWT:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ODY1NTQyMC1kYzM0LTRjMTQtODczYi05NjE4MmQwNDA2ZDciLCJlbWFpbCI6InBpbmF0YUBlbnZpdGVkLm1hcmtldCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNGMxZTAyNzJlNzA3ODE0ZjcwNyIsInNjb3BlZEtleVNlY3JldCI6ImE2MzQ2N2VmMzc0ZmRjNzQ1Mzc2OTBmYjlkNjM3ODk1NjAyMzQ5Y2RmMDJkZGU2MTg2ZmFhOTllNGEwM2VhN2MiLCJleHAiOjE3NjQ2ODM4ODF9.Eu6nr-ZbpCYd4HuejxKCo4xG7qPoioJyBik6x3kJPm4',
      },
      env_development: {
        ENV: 'development',
        TEZOS_ASSETS_CONTRACT: 'KT1NUDsQ5qCpf5Mxmeo2dqRdnKqqL8kpj2LG',
        TEZOS_CHAIN_ID: 'NetXnHfVqm9iesp',
        ASSET_BUCKET_NAME: 'staging-envited-x-data-space--assetsbucket5f3b285a-jajxd4n1z8k2',
        PUBLIC_ASSET_URL: 'https://localhost:4200',
        POSTGRES_PORT: 5436,
        POSTGRES_DATABASE_NAME: 'envited',
        POSTGRES_DATABASE_USER: 'admin',
        POSTGRES_DATABASE_PASSWORD: '123456',
        PINATA_GATEWAY_KEY: 'yCNvt4_psrxde9cshtn7vPtK5HujxSUYaRyNT5aVIu1l5eH2S7pUxSEl7UVQhF-4',
        PINATA_GATEWAY: 'plum-secret-aardwolf-688.mypinata.cloud',
        PINATA_JWT:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ODY1NTQyMC1kYzM0LTRjMTQtODczYi05NjE4MmQwNDA2ZDciLCJlbWFpbCI6InBpbmF0YUBlbnZpdGVkLm1hcmtldCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNGMxZTAyNzJlNzA3ODE0ZjcwNyIsInNjb3BlZEtleVNlY3JldCI6ImE2MzQ2N2VmMzc0ZmRjNzQ1Mzc2OTBmYjlkNjM3ODk1NjAyMzQ5Y2RmMDJkZGU2MTg2ZmFhOTllNGEwM2VhN2MiLCJleHAiOjE3NjQ2ODM4ODF9.Eu6nr-ZbpCYd4HuejxKCo4xG7qPoioJyBik6x3kJPm4',
      },
    },
    {
      name: 'processAssetUpload',
      script:
        './apps/envited-x-data-space/common/aws/handlers/processAssetUpload/processAssetUpload.integration.test.ts',
      watch: '.',
      max_restarts: 1,
      env_development: {
        ENV: 'development',
        AWS_PROFILE: 'ascs',
        POSTGRES_PORT: 5436,
        POSTGRES_DATABASE_NAME: 'envited_metadata_update',
        POSTGRES_DATABASE_USER: 'admin',
        POSTGRES_DATABASE_PASSWORD: '123456',
        PINATA_GATEWAY_KEY: 'yCNvt4_psrxde9cshtn7vPtK5HujxSUYaRyNT5aVIu1l5eH2S7pUxSEl7UVQhF-4',
        PINATA_GATEWAY: 'plum-secret-aardwolf-688.mypinata.cloud',
        PINATA_JWT:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ODY1NTQyMC1kYzM0LTRjMTQtODczYi05NjE4MmQwNDA2ZDciLCJlbWFpbCI6InBpbmF0YUBlbnZpdGVkLm1hcmtldCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1OGEzNGVlNTNmNmU1ZTM4MGM1OCIsInNjb3BlZEtleVNlY3JldCI6IjliMDkyMDUxZGFjZmZmNTdjN2EwMmZiZmQ1ODQ4MGJlZDllYThhZTg5NzdhNjAxZTM5NDk5ZDViNWU5MTU2ODUiLCJleHAiOjE3NjkyNTg2MDB9.gQt3q0wWg9WL9kyIIqwS2ibiIC2VrgaD8bH0NWP0kW8',
        NEXT_PUBLIC_UPLOAD_BUCKET_NAME: 'staging-envited-x-data-space-uploadsbucket10132eb4-6uyzvphqmeli',
        NEXT_PUBLIC_METADATA_BUCKET_NAME: 'staging-envited-x-data-spac-metadatabucket8ef2ffce-obnygiotr7zq',
        NEXT_PUBLIC_ASSET_BUCKET_NAME: 'staging-envited-x-data-space--assetsbucket5f3b285a-jajxd4n1z8k2',
        NEXT_PUBLIC_IPFS_BUCKET_NAME: 'staging-envited-x-data-space-en-ipfsbucket72ccbc1e-xjvx8c5kfvgb',
      },
    },
  ],
}
