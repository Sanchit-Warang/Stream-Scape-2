import React from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import LoginForm from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
      <Card className="w-full md:w-[30%] bg-temp">
        <CardHeader className="font-semibold text-xl">Login</CardHeader>
        <Divider />
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
  )
}

export default LoginPage
