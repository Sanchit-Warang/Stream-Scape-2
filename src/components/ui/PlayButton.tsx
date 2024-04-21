'use client'
import { Button, ButtonProps } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

type PlayButtonProps = ButtonProps & {
  content: string
}

const PlayButton = ({ content = 'Watch', ...props }: ButtonProps) => {
  return (
    <Button {...props} variant="shadow" color="primary">
      <FontAwesomeIcon icon={faPlay} />
      {content}
    </Button>
  )
}

export default PlayButton
