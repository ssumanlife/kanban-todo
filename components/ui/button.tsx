'use client'

import { ComponentProps } from 'react'

interface Props extends ComponentProps<'button'> {
  variant?: 'icon' | 'basic'
}

const Button = ({ variant = 'basic', children, onClick, className, ...props }: Props) => {
  const buttonStyle = {
    icon: 'hover:scale-110 transition-all delay-120 ease-in-out',
    basic:
      'border rounded-lg border-gray-200 text-gray-200 hover:border-primary hover:text-white py-2 px-4',
  }

  return (
    <button
      className={`${buttonStyle[variant]} ${className} flex justify-center items-center `}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
