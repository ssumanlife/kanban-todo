'use client'

import useKanbanStore from '@/stores/kanban-store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import KanbanCard from '../ui/kanban-card'

const KanbanContainer = () => {
  const kanbanList = useKanbanStore((state) => state.kanbanList)
  const { setDraggedKanbanList } = useKanbanStore((state) => state)

  const handleKanbanDragDrop = (prev: number, next: number) => {
    const dropItem = [...kanbanList]
    const draggedItem = dropItem.splice(prev, 1)
    dropItem.splice(next, 0, draggedItem[0])
    setDraggedKanbanList(dropItem)
  }

  return (
    <ul className="w-[1000px] flex flex-col gap-10">
      <DndProvider backend={HTML5Backend}>
        {kanbanList.map((kanban, index) => {
          const { kanbanId, title, description, createdAt, todoList, inProgressList, doneList } =
            kanban
          return (
            <KanbanCard
              key={kanbanId}
              index={index}
              kanbanId={kanbanId}
              title={title}
              description={description}
              createdAt={createdAt}
              todoList={todoList}
              inProgressList={inProgressList}
              doneList={doneList}
              handleKanbanDragDrop={handleKanbanDragDrop}
            />
          )
        })}
      </DndProvider>
    </ul>
  )
}

export default KanbanContainer
