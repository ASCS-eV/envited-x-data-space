import { getServerSession } from '../common/auth'
import { ReinventingMobility, SimulationData, Vision } from '../modules/LandingPage'

export default async function Index() {
  const session = await getServerSession()
  console.log(session)
  return (
    <>
      <Vision />
      <SimulationData />
      <ReinventingMobility />
    </>
  )
}
