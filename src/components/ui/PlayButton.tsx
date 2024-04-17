'use client'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const PlayButton = () => {
  return (
    <Button variant="shadow" color="primary">
      <FontAwesomeIcon icon={faPlay} />
      Watch
    </Button>
  )
}

export default PlayButton
