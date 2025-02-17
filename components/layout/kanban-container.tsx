'use client'

import useKanbanStore from '@/stores/kanban-store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import KanbanCard from '../ui/kanban-card'

const KanbanContainer = () => {
  const kanbanList = useKanbanStore((state) => state.kanbanList)

  return (
    <ul className="w-[1000px] flex flex-col gap-10">
      <DndProvider backend={HTML5Backend}>
        {kanbanList.map((kanban, index) => (
          <KanbanCard key={kanban.kanbanId} index={index} kanban={kanban} />
        ))}
      </DndProvider>
    </ul>
  )
}

export default KanbanContainer
