import { aws_cloudfront, aws_ec2, aws_rds, aws_s3, aws_lambda } from 'aws-cdk-lib'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import * as cdk from 'aws-cdk-lib/core'
import { Bucket, NextjsSite, StackContext } from 'sst/constructs'

export default function Envited({ stack }: StackContext) {
  const vpc = new aws_ec2.Vpc(stack, 'Vpc')

  const sg = new aws_ec2.SecurityGroup(stack, 'PostgresSG', {
    vpc,
    description: 'Postgres SG',
    allowAllOutbound: true,
    securityGroupName: 'PostgresSG',
  })
  sg.addIngressRule(aws_ec2.Peer.anyIpv4(), aws_ec2.Port.tcp(5432))

  const rdsCluster = new aws_rds.DatabaseCluster(stack, 'Envited', {
    engine: aws_rds.DatabaseClusterEngine.auroraPostgres({
      version: aws_rds.AuroraPostgresEngineVersion.VER_15_3,
    }),
    instances: 1,
    instanceProps: {
      vpc,
      securityGroups: [sg],
      instanceType: 'serverless' as any,
    },
    defaultDatabaseName: 'envited',
  })

  ;(rdsCluster.node.findChild('Resource') as aws_rds.CfnDBCluster).serverlessV2ScalingConfiguration = {
    minCapacity: 0.5,
    maxCapacity: 8,
  }
  new cdk.CfnOutput(stack, `VpcId${stack.stage}`, {
    value: vpc.vpcId,
    exportName: `VpcId:${stack.stage}`,
  })
  new cdk.CfnOutput(stack, `SecretArn${stack.stage}`, {
    value: rdsCluster.secret?.secretArn || '',
    exportName: `SecretArn:${stack.stage}`,
  })

  const s3CorsRule = {
    allowedMethods: [aws_s3.HttpMethods.GET, aws_s3.HttpMethods.HEAD, aws_s3.HttpMethods.PUT],
    allowedOrigins: ['*'],
  }

  const uploadsBucket = new Bucket(stack, 'uploads', {
    cdk: {
      bucket: {
        accessControl: aws_s3.BucketAccessControl.PRIVATE,
      },
    },
    cors: [s3CorsRule],
  })

  const oai = new aws_cloudfront.OriginAccessIdentity(stack, 'OAI')
  uploadsBucket.cdk.bucket.grantRead(oai)

  const uploadsDistribution = new aws_cloudfront.CloudFrontWebDistribution(stack, 'uploadsDistribution', {
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: uploadsBucket.cdk.bucket,
          originAccessIdentity: oai,
        },
        behaviors: [
          { isDefaultBehavior: true },
          { pathPattern: '/*', allowedMethods: aws_cloudfront.CloudFrontAllowedMethods.GET_HEAD },
        ],
      },
    ],
  })

  const metadataBucket = new Bucket(stack, 'metadata', {
    cdk: {
      bucket: {
        accessControl: aws_s3.BucketAccessControl.PRIVATE,
      },
    },
    cors: [s3CorsRule],
  })
  metadataBucket.cdk.bucket.grantRead(oai)

  const assetsBucket = new Bucket(stack, 'assets', {
    notifications: {
      validateAndExtractMetadata: {
        function: {
          handler: 'common/aws/validateAndExtractMetadata/index.main',
          environment: {
            NEXT_PUBLIC_METADATA_BUCKET_NAME: metadataBucket.bucketName,
          },
          permissions: [metadataBucket],
          layers: [
            new aws_lambda.LayerVersion(stack, "Schemas", {
              code: aws_lambda.Code.fromAsset("common/aws/validateAndExtractMetadata/schemas"),
            }),
          ],
        },
        events: ['object_created'],
      },
    },
    cdk: {
      bucket: {
        accessControl: aws_s3.BucketAccessControl.PRIVATE,
      },
    },
    cors: [s3CorsRule],
  })
  assetsBucket.attachPermissions([assetsBucket, metadataBucket])
  metadataBucket.attachPermissions([metadataBucket, assetsBucket])
  assetsBucket.cdk.bucket.grantRead(oai)

  const assetsDistribution = new aws_cloudfront.CloudFrontWebDistribution(stack, 'assetsDistribution', {
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: assetsBucket.cdk.bucket,
          originAccessIdentity: oai,
        },
        behaviors: [
          { isDefaultBehavior: true },
          { pathPattern: '/*', allowedMethods: aws_cloudfront.CloudFrontAllowedMethods.GET_HEAD },
        ],
      },
    ],
  })

  const metadataDistribution = new aws_cloudfront.CloudFrontWebDistribution(stack, 'metadataDistribution', {
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: metadataBucket.cdk.bucket,
          originAccessIdentity: oai,
        },
        behaviors: [
          { isDefaultBehavior: true },
          { pathPattern: '/*', allowedMethods: aws_cloudfront.CloudFrontAllowedMethods.GET_HEAD },
        ],
      },
    ],
  })

  // Create the Next.js site
  const site = new NextjsSite(stack, 'envited_ascs_digital', {
    path: './',
    bind: [uploadsBucket, assetsBucket],
    memorySize: '1024 MB',
    timeout: '20 seconds',
    cdk: {
      server: {
        vpc,
        logRetention: RetentionDays.ONE_WEEK,
      },
      revalidation: {
        vpc,
      },
    },
    permissions: ['secretsmanager:GetSecretValue'],
    environment: {
      RDS_SECRET_ARN: rdsCluster.secret?.secretArn || '',
      REGION: process.env.region || 'eu-central-1',
      ENV: process.env.ENV!,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    },
  })

  const metadata = site.getConstructMetadata()

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: metadata.data.url,
    UploadsDistribution: uploadsDistribution.distributionDomainName,
    UploadsDistributionId: uploadsDistribution.distributionId,
    AssetsDistribution: assetsDistribution.distributionDomainName,
    AssetsDistributionId: assetsDistribution.distributionId,
    MetadataDistribution: metadataDistribution.distributionDomainName,
    MetadataDistributionId: metadataDistribution.distributionId,
  })
}
