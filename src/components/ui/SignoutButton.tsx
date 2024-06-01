'use client'
import { logout } from '@/server/actions/auth'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

const SignoutButton = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      color="danger"
      isDisabled={loading}
      size="sm"
      onClick={async () => {
        setLoading(true)
        await logout()
        location.reload()
        setLoading(false)
      }}
    >
      Sign out
    </Button>
  )
}

export default SignoutButton
