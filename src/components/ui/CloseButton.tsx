import { Button, ButtonProps } from '@nextui-org/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/utils/tw'

type CloseButtonProps = ButtonProps

const CloseButton = (props: CloseButtonProps) => {
  return (
    <Button
      color="danger"
      {...props}
      className={cn(props.className)}
      isIconOnly
    >
      <FontAwesomeIcon icon={faX} />
    </Button>
  )
}

export default CloseButton
