'use client'

import { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
  variant?: 'small' | 'medium' | 'large'
  handleValue: (value: string) => void
  handleEnter?: () => void
}

const Input = ({
  variant = 'medium',
  className,
  value,
  handleValue,
  handleEnter,
  ...props
}: Props) => {
  const size = {
    small: 'text-sm',
    medium: '',
    large: 'text-xl font-semibold',
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter' && handleEnter) handleEnter()
  }

  return (
    <input
      type="text"
      className={` ${size[variant]} ${className} bg-transparent w-full placeholder-gray-200 focus:border focus: border-primary rounded-md p-1`}
      value={value}
      onChange={(e) => handleValue(e.target.value)}
      onKeyDown={onKeyDown}
      {...props}
    />
  )
}

export default Input
