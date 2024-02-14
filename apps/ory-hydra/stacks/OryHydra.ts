import { aws_ec2, aws_elasticache, aws_rds } from 'aws-cdk-lib'
import * as cdk from 'aws-cdk-lib/core'
import { StackContext } from 'sst/constructs'

export function OryHydra({ stack }: StackContext) {

  /* 
   * Retrieve VPC
   */
  const vpc = aws_ec2.Vpc.fromLookup(stack, 'Vpc', {
    vpcName: `staging-envitedascsdigital-Envited/Vpc`,
  })

  const sg = aws_ec2.SecurityGroup.fromLookupById(stack, 'HydraSG', 'sg-0e32398ab57f2a85d')

  /* 
   * Create RDS Cluster
   */
  const rdsCluster = new aws_rds.DatabaseCluster(stack, 'Hydra', {
    engine: aws_rds.DatabaseClusterEngine.auroraPostgres({
      version: aws_rds.AuroraPostgresEngineVersion.VER_15_3,
    }),
    instances: 1,
    instanceProps: {
      vpc,
      securityGroups: [sg],
      instanceType: 'serverless' as any,
    },
    defaultDatabaseName: 'hydra',
  })

  ;(rdsCluster.node.findChild('Resource') as aws_rds.CfnDBCluster).serverlessV2ScalingConfiguration = {
    minCapacity: 0.5,
    maxCapacity: 8,
  }

  new cdk.CfnOutput(stack, `HydraRDSSecretArn${stack.stage}`, {
    value: rdsCluster.secret?.secretArn || '',
    exportName: `HydraRDSSecretArn:${stack.stage}`,
  })

  /*
   * Create ElastiCache Redis
   */
  const ecSubnetGroup = new aws_elasticache.CfnSubnetGroup(this, 'HydraElastiCacheSubnetGroup', {
    description: 'Hydra Elasticache Subnet Group',
    subnetIds: vpc.selectSubnets({ subnetType: aws_ec2.SubnetType.PUBLIC }).subnetIds,
    cacheSubnetGroupName: 'HydraRedisSubnetGroup'
  })

  const SecurityGroup = new aws_ec2.SecurityGroup(this, 'HydraRedisSG', {
    vpc,
    description: 'Hydra Redis SG',
    allowAllOutbound: true,
  })

  const redis = new aws_elasticache.CfnServerlessCache(this, 'HydraRedis', {
    engine: 'redis',
    serverlessCacheName: 'HydraRedis',
    // Usage is set to absolute minimum to limit charges. Revisit when it becomes necessary.
    cacheUsageLimits: {
      dataStorage: {
        maximum: 1,
        unit: 'GB',
      },
      ecpuPerSecond: {
        maximum: 1000,
      },
    },
    description: 'Hydra Redis',
    securityGroupIds: [SecurityGroup.securityGroupId],
    subnetIds: ecSubnetGroup.subnetIds,
  })

  new cdk.CfnOutput(this, `HydraRedisCacheEndpointUrl${stack.stage}`, {
    value: redis.attrEndpointAddress,
  });

  new cdk.CfnOutput(this, `HydraRedisCachePort${stack.stage}`, {
    value: redis.attrReaderEndpointPort,
  })
}
