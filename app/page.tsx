import KanbanContainer from '@/components/layout/kanban-container'
import SideBar from '@/components/layout/sidebar'

const Home = () => {
  return (
    <main className="flex w-[1280px] gap-16 pt-14 justify-center">
      <KanbanContainer />
      <SideBar />
    </main>
  )
}
export default Home
