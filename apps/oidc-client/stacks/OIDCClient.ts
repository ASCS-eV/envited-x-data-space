import { StackContext, StaticSite } from 'sst/constructs'

export function OIDCClient({ stack }: StackContext) {
  new StaticSite(stack, 'oidc-client', {
    path: './',
    buildOutput: '../../dist/apps/oidc-client',
    buildCommand: 'cd ../../ && npx nx build oidc-client --prod',
    environment: {},
  })
}
