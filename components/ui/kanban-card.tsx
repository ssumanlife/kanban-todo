import { useRef } from 'react'

import useKanbanStore, { KanbanModel } from '@/stores/kanban-store'
import { useDrag, useDrop } from 'react-dnd'
import { HiOutlineBars3 } from 'react-icons/hi2'

import Input from './input'

interface Props extends KanbanModel {
  index: number
  handleKanbanDragDrop: (prev: number, next: number) => void
}
const KanbanCard = ({
  index,
  kanbanId,
  title,
  description,
  createdAt,
  handleKanbanDragDrop,
}: Props) => {
  const kanbanRef = useRef(null)
  const { updateKanban } = useKanbanStore((state) => state)

  const [, drop] = useDrop({
    accept: 'kanban',
    hover: (item: { index: number }) => {
      if (!kanbanRef.current) return
      if (item.index !== index) {
        handleKanbanDragDrop(item.index, index)
        item.index = index
      }
    },
  })

  const [, drag] = useDrag({
    type: 'kanban',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(kanbanRef))

  return (
    <li ref={kanbanRef} className="flex justify-between items-center gap-4">
      <HiOutlineBars3 size={32} />
      <div className="w-full p-8 bg-gray-600 rounded-lg flex flex-col gap-2">
        <div className="flex justify-between gap-60">
          <Input
            value={title}
            placeholder="제목을 입력하세요."
            variant="large"
            maxLength={24}
            handleValue={(value: string) => updateKanban(kanbanId, 'title', value)}
          />
          <span className="text-sm text-gray-200 text-nowrap">{createdAt}</span>
        </div>
        <Input
          value={description}
          placeholder="내용을 입력하세요."
          handleValue={(value: string) => updateKanban(kanbanId, 'description', value)}
        />
        <div className="flex flex-wrap gap-4">{/* todo list 추가하기 */}</div>
      </div>
    </li>
  )
}

export default KanbanCard
