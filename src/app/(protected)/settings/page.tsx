import { auth } from '@/auth'
import Signout from './signout'

const Settings = async () => {
  const session = await auth()
  return <div>Settings page
    <pre>{JSON.stringify(session)}</pre>
    <Signout />
  </div>
}

export default Settings
