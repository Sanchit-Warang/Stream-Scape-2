'use client'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIECT } from '@/routes'

const Socials = () => {
  const login = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIECT,
    })
  }

  return (
    <div className="flex gap-2 w-full justify-center">
      <Button
        variant="bordered"
        color="success"
        onClick={() => login('google')}
      >
        <FontAwesomeIcon icon={faGoogle} />
        Google
      </Button>
      <Button
        variant="bordered"
        color="success"
        onClick={() => login('github')}
      >
        <FontAwesomeIcon icon={faGithub} />
        Github
      </Button>
    </div>
  )
}

export default Socials
