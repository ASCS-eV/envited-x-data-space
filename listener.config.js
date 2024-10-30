module.exports = {
  apps : [{
    name: 'Listener',
    script: './apps/envited.ascs.digital/listener/index.ts',
    watch: '.',
    env_staging: {
      ENV: 'staging',
      ASSETS_CONTRACT: 'KT1NUDsQ5qCpf5Mxmeo2dqRdnKqqL8kpj2LG',
      RDS_SECRET_ARN: 'arn:aws:secretsmanager:eu-central-1:597778497612:secret:EnvitedSecretD661DE26-KcCzWiLKyXmK-9z9dYl',
    },
    env_development: {
      ENV: 'development',
      ASSETS_CONTRACT: 'KT1NUDsQ5qCpf5Mxmeo2dqRdnKqqL8kpj2LG',
      POSTGRES_PORT: 5436,
      POSTGRES_DATABASE_NAME: 'envited',
      POSTGRES_DATABASE_USER: 'admin',
      POSTGRES_DATABASE_PASSWORD: '123456',
    }, 
  }],
};
