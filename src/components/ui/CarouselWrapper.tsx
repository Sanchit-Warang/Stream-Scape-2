'use client'
import { useRef } from 'react'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const CarouselWrapper = ({ children }: { children: React.ReactNode }) => {
  const showsRef = useRef<HTMLDivElement>(null)
  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!showsRef.current) return

    const { scrollLeft, clientWidth } = showsRef.current
    const offset =
      direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth

    showsRef.current.scrollTo({ left: offset, behavior: 'smooth' })

    if (scrollLeft === 0 && direction === 'left') {
      showsRef.current.scrollTo({
        left: showsRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }
  return (
    <div className="group relative flex items-center">
      <Button
        onClick={() => scrollToDirection('left')}
        className=" bg-secondary/50 btn-scroll-right absolute z-[50] hidden md:group-hover:block h-20"
        isIconOnly
        color="secondary"
        variant="ghost"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>

      <Button
        variant="ghost"
        color="secondary"
        onClick={() => scrollToDirection('right')}
        className=" bg-secondary/50 btn-scroll-right absolute z-[50] right-0 hidden md:group-hover:block h-20"
        isIconOnly
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>

      <div
        ref={showsRef}
        className="carousel-container  mt-4 flex gap-2 overflow-x-auto overflow-y-visible no-scrollbar py-2"
      >
        {children}
      </div>
    </div>
  )
}

export default CarouselWrapper
