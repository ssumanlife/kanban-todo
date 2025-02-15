import React, { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
  value?: string
  variant?: 'small' | 'medium' | 'large'
  handleValue: (value: string) => void
}

const Input = ({ variant = 'medium', value, placeholder, handleValue, maxLength }: Props) => {
  const size = {
    small: 'text-sm',
    medium: '',
    large: 'text-xl font-semibold',
  }
  return (
    <input
      type="text"
      className={`bg-transparent w-full ${size[variant]} placeholder-gray-200 focus:border focus: border-primary rounded-md p-1`}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(e) => handleValue(e.target.value)}
    />
  )
}

export default Input
