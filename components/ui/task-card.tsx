import useKanbanStore from '@/stores/kanban-store'
import { TodoLabelType, TodoStatusType } from '@/types/kanban-type'
import { HiOutlinePlusSm } from 'react-icons/hi'

import Button from './button'
import Label from './label'

interface Props {
  status: TodoStatusType
  kanbanId: string
  children: React.ReactNode
}

const TASK_LABEL: { [key in TodoStatusType]: TodoLabelType } = {
  todoList: 'To do',
  inProgressList: 'In Progress',
  doneList: 'Done',
}

const TaskCard = ({ status, kanbanId, children }: Props) => {
  const addTodo = useKanbanStore((state) => state.addTodo)

  return (
    <div className="bg-gray-500 rounded-md p-[20px] flex flex-col gap-2">
      <div>
        <Label id={status} label={TASK_LABEL[status]} />
      </div>
      {children}
      <div className="text-sm w-full flex justify-center">
        <Button variant="icon" className="gap-2" onClick={() => addTodo(kanbanId, status)}>
          <HiOutlinePlusSm fill="#a7a7a7" size={20} />할 일
        </Button>
      </div>
    </div>
  )
}

export default TaskCard
