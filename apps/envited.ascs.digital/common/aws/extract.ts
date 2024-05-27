import { S3Handler } from 'aws-lambda'

export const main: S3Handler = async (event) => {
  console.log('Extract handler', event)
}
