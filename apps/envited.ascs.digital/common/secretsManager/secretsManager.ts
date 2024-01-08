import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'

export const getSecret = (secretId: string) =>
  new SecretsManagerClient()
    .send(new GetSecretValueCommand({ SecretId: secretId }))
    .then(({ SecretString }) => (SecretString ? JSON.parse(SecretString) : {}))
    .catch(error => console.log('error', error))
