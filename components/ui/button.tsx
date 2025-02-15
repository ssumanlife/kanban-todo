import { ComponentProps } from 'react'

interface Props extends ComponentProps<'button'> {
  children: React.ReactNode
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="border rounded-lg border-gray-200 text-gray-200 hover:border-primary hover:text-white flex justify-center items-center py-2 px-4"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
