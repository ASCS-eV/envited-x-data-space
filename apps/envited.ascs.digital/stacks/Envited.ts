import { aws_ec2, aws_rds } from 'aws-cdk-lib'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import * as cdk from 'aws-cdk-lib/core'
import { NextjsSite, StackContext } from 'sst/constructs'

export default function Envited({ stack }: StackContext) {

  const vpc = new aws_ec2.Vpc(stack, 'Vpc')

  const sg = new aws_ec2.SecurityGroup(stack, 'PostgresSG', {
    vpc,
    description: 'Postgres SG',
    allowAllOutbound: true,
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

  // Create the Next.js site
  const site = new NextjsSite(stack, 'envited_ascs_digital', {
    path: './',
    memorySize: '1024 MB',
    timeout: '20 seconds',
    edge: false,
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
    },
  })

  const metadata = site.getConstructMetadata()

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: metadata.data.url,
  })
}
