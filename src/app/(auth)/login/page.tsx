import React from 'react'
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'
import LoginForm from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <Card className="w-full md:w-[30%]">
      <CardHeader className="font-semibold text-xl">Login</CardHeader>
      <Divider />
      <CardBody>
        <LoginForm />
      </CardBody>
    </Card>
  )
}

export default LoginPage
