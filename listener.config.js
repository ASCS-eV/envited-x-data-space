module.exports = {
  apps: [
    {
      name: 'Listener',
      script: './apps/envited.ascs.digital/listener/index.ts',
      watch: '.',
      env_staging: {
        ENV: 'staging',
        ASSETS_CONTRACT: 'KT19RZz4bezfgPD7Kc1tJ84bs58AFmkf4zxE',
        ASSET_BUCKET_NAME: 'staging-envitedascsdigital-en-assetsbucket5f3b285a-ug4zozpjyshd',
        ASSET_URL: 'https://d234i0z2knz9va.cloudfront.net',
        RDS_SECRET_ARN:
          'arn:aws:secretsmanager:eu-central-1:597778497612:secret:EnvitedSecretD661DE26-KcCzWiLKyXmK-9z9dYl',
        RDS_DB_NAME: 'envited',
        RDS_RESOURCE_ARN:
          'arn:aws:rds:eu-central-1:597778497612:cluster:staging-envitedascsdigital-envited-envited46e22b9b-l2rchfuookv5',
      },
      env_development: {
        ENV: 'development',
        ASSETS_CONTRACT: 'KT1NUDsQ5qCpf5Mxmeo2dqRdnKqqL8kpj2LG',
        ASSET_BUCKET_NAME: 'staging-envitedascsdigital-en-assetsbucket5f3b285a-ug4zozpjyshd',
        ASSET_URL: 'https://d234i0z2knz9va.cloudfront.net',
        POSTGRES_PORT: 5436,
        POSTGRES_DATABASE_NAME: 'envited',
        POSTGRES_DATABASE_USER: 'admin',
        POSTGRES_DATABASE_PASSWORD: '123456',
      },
    },
  ],
}
