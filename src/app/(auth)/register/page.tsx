import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import RegisterForm from '@/components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <Card className="w-full md:w-[30%] bg-temp">
      <CardHeader className="font-semibold text-xl ">Register</CardHeader>
      <Divider />
      <CardBody>
        <RegisterForm />
      </CardBody>
    </Card>
  )
}

export default RegisterPage
