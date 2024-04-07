import React from 'react'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
  )
}

export default AuthLayout
