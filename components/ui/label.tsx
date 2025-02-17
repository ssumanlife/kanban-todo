import { TodoLabelType, TodoStatusType } from '@/types/kanban-type'

interface Props {
  id: TodoStatusType
  label: TodoLabelType
}

const Label = ({ id, label }: Props) => {
  const labelStyle = {
    todoList: 'bg-pink',
    inProgressList: 'bg-purple',
    doneList: 'bg-blue',
  }

  return <label className={`rounded-lg text-white ${labelStyle[id]} px-2 text-sm`}>{label}</label>
}

export default Label
