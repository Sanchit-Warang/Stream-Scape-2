'use client'
import { logout } from '@/server/actions/auth'

const Signout = () => {
  return (
    <button
      onClick={async () => {
        await logout()
        location.reload()
      }}
    >
      signout
    </button>
  )
}

export default Signout
