
import { NextjsSite, StackContext } from 'sst/constructs'

export default function Envited({ stack }: StackContext) {
  // Create the Next.js site
  const site = new NextjsSite(stack, 'envited_ascs_digital', {
    path: './',
    memorySize: '1024 MB',
    timeout: '20 seconds',
    environment: {},
  })

  const metadata = site.getConstructMetadata()

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: metadata.data.url,
  })
}
