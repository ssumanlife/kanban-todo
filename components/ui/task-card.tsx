import useKanbanStore from '@/stores/kanban-store'
import { TaskLabelType, TaskStatusType } from '@/types/kanban-type'
import { HiOutlinePlusSm } from 'react-icons/hi'

import Button from './button'
import Label from './label'

interface Props {
  status: TaskStatusType
  kanbanId: string
  children: React.ReactNode
}

const TASK_LABEL: { [key in TaskStatusType]: TaskLabelType } = {
  todoList: 'To do',
  inProgressList: 'In Progress',
  doneList: 'Done',
}

const TaskCard = ({ status, kanbanId, children }: Props) => {
  const addTask = useKanbanStore((state) => state.actions.addTask)

  return (
    <div className="bg-gray-500 rounded-md p-[20px] flex flex-col gap-2">
      <div className="flex justify-between">
        <Label id={status} label={TASK_LABEL[status]} />
        <Button variant="icon" onClick={() => addTask(kanbanId, status)} aria-label="할 일 추가">
          <HiOutlinePlusSm fill="#a7a7a7" size={20} />
        </Button>
      </div>
      {children}
    </div>
  )
}

export default TaskCard
