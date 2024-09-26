import { Footer } from '../modules/Footer'
import { Header, HeaderPages } from '../modules/Header'
import { NotificationContainer } from '../modules/Notifications'


export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderPages />
      <NotificationContainer />
      {children}
      <Footer />
    </>
  )
}
