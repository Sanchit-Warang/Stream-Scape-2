'use client'
import { Input, Button } from '@nextui-org/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schema/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { login } from '@/server/actions/auth'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Socials from '@/components/auth/Socials'

type FormFields = z.infer<typeof LoginSchema>

const LoginForm = () => {
  const form = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await login(data)
    if (result.error) {
      toast.error(result.error)
    }
    if (result.success) {
      toast.success(result.success)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Input
        {...form.register('email')}
        color="primary"
        required
        type="email"
        label="Email"
        isInvalid={form.formState.errors.email ? true : false}
        errorMessage={form.formState.errors.email?.message}
      />
      <Input
        {...form.register('password')}
        color="primary"
        required
        type="password"
        label="Password"
        isInvalid={form.formState.errors.password ? true : false}
        errorMessage={form.formState.errors.password?.message}
      />
      <div className="flex justify-center">
        <Button
          isDisabled={form.formState.isSubmitting}
          color="primary"
          variant="shadow"
          type="submit"
        >
          Login
        </Button>
      </div>{' '}
      <Socials />
      <Link href={'/register'}>
        <p className=" mt-4 text-center hover:text-primary cursor-pointer">
          {"Don't have an accout register"}
        </p>
      </Link>
    </form>
  )
}

export default LoginForm
