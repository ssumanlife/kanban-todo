'use client'

import useKanbanStore from '@/stores/kanban-store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import KanbanCard from '../ui/kanban-card'

// react-dnd Provider 하위에 KanbanCard 렌더링
const KanbanContainer = () => {
  const kanbanList = useKanbanStore((state) => state.kanbanList)

  return (
    <ul className="flex flex-col gap-10">
      <DndProvider backend={HTML5Backend}>
        {kanbanList.map((kanban, index) => (
          <KanbanCard key={kanban.kanbanId} index={index} kanban={kanban} />
        ))}
      </DndProvider>
    </ul>
  )
}

export default KanbanContainer
