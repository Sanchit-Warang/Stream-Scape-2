'use client'
import { Button, ButtonProps } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
const InfoButton = (props: ButtonProps) => {
  return (
    <Button {...props} variant="bordered" color="primary">
      <FontAwesomeIcon icon={faCircleInfo} />
      More Info
    </Button>
  )
}

export default InfoButton
