import dynamic from 'next/dynamic'

import SideBar from '@/components/layout/sidebar'
import Skeleton from '@/components/ui/skeleton'

const KanbanContainer = dynamic(() => import('@/components/layout/kanban-container'), {
  ssr: false,
  loading: () => <Skeleton />,
})

const Home = () => {
  return (
    <main className="flex max-w-screen-xl gap-16 pt-14 justify-between">
      <section className="min-w-section_w min-h-fit">
        <KanbanContainer />
      </section>
      <SideBar />
    </main>
  )
}
export default Home
