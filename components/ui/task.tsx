import React, { useRef } from 'react'

import { ITEM_TYPE } from '@/constants/drag-and-drop'
import useKanbanStore from '@/stores/kanban-store'
import { TodoModel, TodoStatusType } from '@/types/kanban-type'
import { handleMoveTask } from '@/utills/move-Item'
import { useDrag, useDrop } from 'react-dnd'
import { HiMiniSquares2X2 } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'

import Button from './button'
import Input from './input'

interface Props {
  todo: TodoModel | null
  index: number
  kanbanId: string
  status: TodoStatusType
}

const Task = ({ todo, index, kanbanId, status }: Props) => {
  const todoRef = useRef<HTMLLIElement>(null)
  const kanbanList = useKanbanStore((state) => state.kanbanList)
  const { updateTodo, deleteTodo, addTodo, setDraggedKanbanList } = useKanbanStore((state) => state)

  const [, drop] = useDrop({
    accept: ITEM_TYPE.TASK,
    drop: (item: { index: number; kanbanId: string; status: TodoStatusType; type: string }) => {
      if (!todoRef.current || item.type !== ITEM_TYPE.TASK) return

      let newKanbanList = [...kanbanList]
      if ((item.index !== index || item.status !== status) && item.kanbanId === kanbanId) {
        newKanbanList = handleMoveTask(
          kanbanList,
          item.index,
          index,
          item.status,
          status,
          item.kanbanId,
        ) || [...kanbanList]
      }

      if (item.kanbanId !== kanbanId) {
        newKanbanList = handleMoveTask(
          kanbanList,
          item.index,
          index,
          item.status,
          status,
          item.kanbanId,
          kanbanId,
        ) || [...kanbanList]
      }
      setDraggedKanbanList(newKanbanList)
    },
  })

  const [, drag] = useDrag({
    type: ITEM_TYPE.TASK,
    item: { kanbanId, index, status, type: ITEM_TYPE.TASK },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(todoRef))

  return (
    <li ref={todoRef} id="todo" className="flex gap-1 items-center min-h-8">
      {todo && (
        <>
          <HiMiniSquares2X2 fill="#a7a7a7" size={20} className="cursor-pointer" />
          <Input
            variant="small"
            value={todo.description}
            placeholder="할 일을 입력하세요."
            handleValue={(value) => updateTodo(kanbanId, status, todo.todoId, value)}
            handleEnter={() => addTodo(kanbanId, status)}
          />
          <Button variant="icon" onClick={() => deleteTodo(kanbanId, todo.todoId, status)}>
            <IoClose fill="#a7a7a7" size={20} />
          </Button>
        </>
      )}
    </li>
  )
}

export default React.memo(Task)
