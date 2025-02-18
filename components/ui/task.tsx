import React, { useRef } from 'react'

import { ITEM_TYPE } from '@/constants/drag-and-drop'
import useKanbanStore from '@/stores/kanban-store'
import { TaskModel, TaskStatusType } from '@/types/kanban-type'
import { handleMoveTask } from '@/utills/move-Item'
import { useDrag, useDrop } from 'react-dnd'
import { HiMiniSquares2X2 } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'

import Button from './button'
import Input from './input'

interface Props {
  task: TaskModel | null
  index: number
  kanbanId: string
  status: TaskStatusType
}

const Task = ({ task, index, kanbanId, status }: Props) => {
  const taskRef = useRef<HTMLLIElement>(null)
  const kanbanList = useKanbanStore((state) => state.kanbanList)
  const { updateTask, deleteTask, addTask, setDraggedKanbanList } = useKanbanStore(
    (state) => state.actions,
  )

  // 'task' type인 Drag and Drop 설정, drop 시 핸들러 실행
  const [, drop] = useDrop({
    accept: ITEM_TYPE.TASK,
    drop: (item: { index: number; kanbanId: string; status: TaskStatusType; type: string }) => {
      if (!taskRef.current || item.type !== ITEM_TYPE.TASK) return

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

  drag(drop(taskRef))

  return (
    <li ref={taskRef} className="flex gap-1 items-center min-h-8">
      {task && (
        <>
          <HiMiniSquares2X2 fill="#a7a7a7" size={20} className="cursor-pointer" />
          <Input
            variant="small"
            value={task.description}
            placeholder="할 일을 입력하세요."
            handleValue={(value) => updateTask(kanbanId, status, task.taskId, value)}
            handleEnter={() => addTask(kanbanId, status)}
          />
          <Button variant="icon" onClick={() => deleteTask(kanbanId, task.taskId, status)}>
            <IoClose fill="#a7a7a7" size={20} />
          </Button>
        </>
      )}
    </li>
  )
}

export default React.memo(Task)
