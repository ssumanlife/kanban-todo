export type TodoStatusType = 'todoList' | 'inProgressList' | 'doneList'

export type TodoLabelType = 'To do' | 'In Progress' | 'Done'

export interface TodoModel {
  kanbanId: string
  todoId: string
  description: string
}

export interface KanbanModel {
  kanbanId: string
  title: string
  description: string
  createdAt: string
  todoList: TodoModel[]
  inProgressList: TodoModel[]
  doneList: TodoModel[]
}
