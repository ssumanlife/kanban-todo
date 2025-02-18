import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import './globals.css'

const pretend = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretend',
})

export const metadata: Metadata = {
  title: '나만을 위한 칸반 보드',
  description: '나만을 위한 칸반 보드에 할 일을 기록해보세요!',
  metadataBase: new URL('https://kanban-ssuman.vercel.app/'),
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${pretend.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
