'use client'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
const InfoButton = () => {
  return (
    <Button variant="bordered" color="primary">
      <FontAwesomeIcon icon={faCircleInfo} />
      More Info
    </Button>
  )
}

export default InfoButton
