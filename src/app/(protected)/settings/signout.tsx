'use client'
import { logout } from '@/server/actions/auth'



const Signout = () => {
  return <button onClick={() => logout()}>signout</button>
}

export default Signout
