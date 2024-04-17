'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from '@nextui-org/react'
import { useWindowScroll } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import { Avatar } from '@nextui-org/react'

const Navigation = () => {
  const [scroll] = useWindowScroll()
  const session = useSession()
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ]
  return (
    <Navbar
      position="static"
      // shouldHideOnScroll
      isBordered
      className={`sticky top-0 left-0 z-50 h-[7vh] bg-opacity-30 bg-black ${
        scroll.y < 10 ? 'border-0 backdrop-blur-none' : 'bg-transperant'
      }`}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarBrand>
        <p className="font-semibold text-inherit">StreamScape</p>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>Features</NavbarItem>
        <NavbarItem isActive>Customers</NavbarItem>
        <NavbarItem>Integrations</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {session.data?.user ? (
          <NavbarItem>
            {session.data?.user.name}
            <Avatar src={session.data?.user.image ? session.data?.user.image : ''} />
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">Login</NavbarItem>
            <NavbarItem>
              <Button color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? 'warning'
                    : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarContent> */}
    </Navbar>
  )
}

export default Navigation
