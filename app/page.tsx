import dynamic from 'next/dynamic'

import KanbanSection from '@/components/layout/kanban-section'
import Skeleton from '@/components/ui/skeleton'

const KanbanContainer = dynamic(() => import('@/components/layout/kanban-container'), {
  ssr: false,
  loading: () => <Skeleton />,
})

const Home = () => {
  return (
    <main className="max-w-section_w my-header_h mx-auto gap-4 pt-4 overflow-visible ">
      <KanbanSection>
        <KanbanContainer />
      </KanbanSection>
    </main>
  )
}
export default Home
