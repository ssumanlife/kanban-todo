'use client'

import useKanbanStore from '@/stores/kanban-store'

import Button from '../ui/button'

const SideBar = () => {
  const { addKanban, resetKanban } = useKanbanStore((state) => state)

  return (
    <aside className="relative h-full w-[100px]">
      <div className="fixed flex flex-col gap-20 w-[100px]">
        <Button onClick={addKanban}>칸반 추가</Button>
        <Button onClick={resetKanban}>초기화</Button>
      </div>
    </aside>
  )
}

export default SideBar
