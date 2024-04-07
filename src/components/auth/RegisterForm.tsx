'use client'
import { Input, Button } from '@nextui-org/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schema/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { register } from '@/server/actions/auth'
import toast from 'react-hot-toast'
import Link from 'next/link'

type FormFields = z.infer<typeof RegisterSchema>

const RegisterForm = () => {
  const form = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await register(data)
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
        {...form.register('name')}
        color="primary"
        required
        type="text"
        label="Name"
        isInvalid={form.formState.errors.name ? true : false}
        errorMessage={form.formState.errors.name?.message}
      />
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
          Register
        </Button>
      </div>{' '}
      <Link href={'/login'}>
        <p className=" mt-4 text-center hover:text-primary cursor-pointer">
          {"ALready have an account login"}
        </p>
      </Link>
    </form>
  )
}

export default RegisterForm
