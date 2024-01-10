import { ExampleTable } from '../modules/ExampleTable'
import { Header } from '../modules/Header'
import { HeroHeader } from '../modules/HeroHeader'

export default async function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroHeader />
        <div className="mx-auto max-w-6xl">
          <ExampleTable />
        </div>
      </main>
    </>
  )
}
