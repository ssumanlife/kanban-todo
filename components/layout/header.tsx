'use client'

import { usePathname } from 'next/navigation'

const Header = () => {
  const path = usePathname()

  return (
    <div className="w-full fixed top-0 z-100 flex justify-center items-center h-header border-b-gray-300 border-b text-2xl font-bold">
      <div className="w-full max-w-screen-xl flex justify-center items-center h-full">
        {path !== '/' ? 'To do' : 'KanBan Board'}
      </div>
    </div>
  )
}

export default Header
