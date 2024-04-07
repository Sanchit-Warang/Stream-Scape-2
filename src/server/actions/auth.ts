'use server'
import { z } from 'zod'
import { LoginSchema, RegisterSchema } from '@/schema/auth'

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Logged in' }
}

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Registered' }
}
