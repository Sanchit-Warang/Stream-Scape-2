import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react'
import RegisterForm from '@/components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <Card className="w-full md:w-[30%]">
      <CardHeader className="font-semibold text-xl">Register</CardHeader>
      <Divider />
      <CardBody>
        <RegisterForm />
      </CardBody>
    </Card>
  )
}

export default RegisterPage
