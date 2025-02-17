export type TaskStatusType = 'todoList' | 'inProgressList' | 'doneList'

export type TaskLabelType = 'To do' | 'In Progress' | 'Done'

export interface TaskModel {
  kanbanId: string
  taskId: string
  description: string
}

export interface KanbanModel {
  kanbanId: string
  title: string
  description: string
  createdAt: string
  todoList: TaskModel[]
  inProgressList: TaskModel[]
  doneList: TaskModel[]
}
