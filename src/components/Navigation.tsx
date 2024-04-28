'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  Avatar,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from '@nextui-org/react'
import { useWindowScroll } from '@mantine/hooks'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Navigation = () => {
  const [scroll] = useWindowScroll()
  const session = useSession()
  return (
    <Navbar
      position="static"
      // shouldHideOnScroll
      isBordered
      className={`sticky top-0 left-0 z-50 bg-opacity-30 bg-black ${
        scroll.y < 10 ? 'border-0 backdrop-blur-none' : 'bg-transperant'
      }`}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarBrand>
        <Link href={'/'}>
          <p className="font-semibold text-inherit">
            <img src="/logo1.png" className="w-[7rem]" alt="" />
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {session.data?.user ? (
          <NavbarItem className='flex gap-3 items-center'>
            <Avatar
              isBordered
              color="success"
              src={session.data?.user.image ? session.data?.user.image : ''}
            />
            <p className='text-copy-light font-semibold'>{session.data?.user.name}</p>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="secondary"
                href="/login"
                variant="shadow"
              >
                Login
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarMenu>
          <NavbarMenuItem>
            <Link
              className="w-full"
              // color={
              //   index === 2
              //     ? 'warning'
              //     : index === menuItems.length - 1
              //     ? 'danger'
              //     : 'foreground'
              // }
              href="#"
              // size="lg"
            >
              Login
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  )
}

export default Navigation
