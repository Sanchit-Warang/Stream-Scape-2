'use client'
import { Button, ButtonProps } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'

type PlayButtonProps = ButtonProps & {
  content?: string
  to?: string
}

const PlayButton = ({
  content = 'Watch',
  to = '/',
  ...props
}: PlayButtonProps) => {
  // const router = useRouter()
  return (
    <Button
      as={Link}
      href={to}
      {...props}
      // onClick={() => router.replace(to)}
      variant="shadow"
      color="primary"
    >
      <FontAwesomeIcon icon={faPlay} />
      {content}
    </Button>
  )
}

export default PlayButton
