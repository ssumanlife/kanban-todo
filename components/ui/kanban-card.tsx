import React, { ReactElement, useRef } from 'react'

import { ITEM_TYPE } from '@/constants/drag-and-drop'
import useKanbanStore from '@/stores/kanban-store'
import { KanbanModel, TaskModel, TaskStatusType } from '@/types/kanban-type'
import { handleMoveKanban } from '@/utills/move-Item'
import { useDrag, useDrop } from 'react-dnd'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { MdOutlineDelete } from 'react-icons/md'

import Button from './button'
import Input from './input'
import Task from './task'
import TaskCard from './task-card'

interface Props {
  index: number
  kanban: KanbanModel
}

const KanbanCard = ({ index, kanban }: Props) => {
  const kanbanRef = useRef<HTMLLIElement>(null)
  const kanbanList = useKanbanStore((state) => state.kanbanList)
  const { updateKanban, deleteKanban, setDraggedKanbanList } = useKanbanStore(
    (state) => state.actions,
  )
  const { kanbanId, title, description, createdAt, todoList, inProgressList, doneList } = kanban

  // 'kanban' type인 Drag and Drop 설정, drop 시 핸들러 실행
  const [, drop] = useDrop({
    accept: ITEM_TYPE.KANBAN,
    drop: (item: { index: number; type: string }) => {
      if (!kanbanRef.current || item.type !== ITEM_TYPE.KANBAN) return
      if (item.index !== index) {
        const newKanbanList = handleMoveKanban(kanbanList, item.index, index)
        if (newKanbanList) setDraggedKanbanList(newKanbanList)
        item.index = index
      }
    },
  })

  const [, drag] = useDrag({
    type: ITEM_TYPE.KANBAN,
    item: { index, type: ITEM_TYPE.KANBAN },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(kanbanRef))

  /** 리스트가 없을 때엔 Task컴포넌트가 렌더링되지 않아 Task의 상태 변경 시 이동되지 않으므로
    리스트가 없을 시에도 Task컴포넌트가 렌더링 될 수 있도록 함 */
  const returnTaskGroup = (list: TaskModel[], status: TaskStatusType) => {
    let taskGroup: ReactElement | ReactElement[] = (
      <Task task={null} index={index} kanbanId={kanbanId} status={status} />
    )

    if (list.length > 0) {
      taskGroup = list.map((task, index) => (
        <Task key={task.taskId} task={task} index={index} kanbanId={kanbanId} status={status} />
      ))
    }
    return taskGroup
  }

  return (
    <li ref={kanbanRef} id="kanban" className="flex justify-between items-center gap-4">
      <HiOutlineBars3 size={32} className="cursor-pointer" />

      <article className="w-full p-8 bg-gray-600 rounded-lg flex flex-col gap-3">
        <div className="flex justify-between gap-60">
          <Input
            value={title}
            placeholder="제목을 입력하세요."
            variant="large"
            maxLength={24}
            handleValue={(value: string) => updateKanban(kanbanId, 'title', value)}
          />
          <Button variant="icon" onClick={() => deleteKanban(kanbanId)}>
            <MdOutlineDelete fill="#a7a7a7" size={24} />
          </Button>
        </div>

        <Input
          value={description}
          placeholder="내용을 입력하세요."
          maxLength={70}
          handleValue={(value: string) => updateKanban(kanbanId, 'description', value)}
        />

        <div className="grid grid-cols-3 gap-4 ">
          {/* TaskCard와 Task를 KanbanCard에서 렌더링하여 자식 컴포넌트에 필요한 Props 각각 전달  */}
          {Object.entries({ todoList, inProgressList, doneList }).map((list) => (
            <TaskCard key={list[0]} status={list[0] as TaskStatusType} kanbanId={kanbanId}>
              <ul className="flex flex-col gap-2 my-2">
                {returnTaskGroup(list[1], list[0] as TaskStatusType)}
              </ul>
            </TaskCard>
          ))}
        </div>

        <span className="flex justify-end text-sm text-gray-200 text-nowrap">{createdAt}</span>
      </article>
    </li>
  )
}

export default React.memo(KanbanCard)
