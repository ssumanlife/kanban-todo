import dynamic from 'next/dynamic'

import SideBar from '@/components/layout/sidebar'

const KanbanContainer = dynamic(() => import('@/components/layout/kanban-container'), {
  ssr: false,
})

const Home = () => {
  return (
    <main className="flex w-[1280px] gap-16 pt-14 justify-center">
      <section className="min-w-[1000px] min-h-fit">
        <KanbanContainer />
      </section>
      <SideBar />
    </main>
  )
}
export default Home
