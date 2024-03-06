import { ExampleTable } from '../modules/ExampleTable'
import { HeroHeader } from '../modules/HeroHeader'

export default async function Index() {
  return (
    <>
      <main>
        <HeroHeader />
        <div className="mx-auto max-w-6xl">
          <ExampleTable />
        </div>
      </main>
    </>
  )
}
