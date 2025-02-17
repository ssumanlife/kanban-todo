import { KanbanModel, TodoStatusType } from '@/types/kanban-type'

// 칸반 이동 시에 실행되는 핸들러
export const handleMoveKanban = (kanbanList: KanbanModel[], prev: number, next: number) => {
  const newKanbanList = [...kanbanList]
  const draggedItem = newKanbanList.splice(prev, 1)[0]

  if (!draggedItem) return
  newKanbanList.splice(next, 0, draggedItem)

  return newKanbanList
}

// Task 이동 시에 실행되는 핸들러
export const handleMoveTask = (
  kanbanList: KanbanModel[],
  prev: number,
  next: number,
  status: TodoStatusType,
  nextStatus: TodoStatusType,
  kanbanId: string,
  nextKanbanId?: string,
) => {
  const newKanbanList = [...kanbanList]
  const currentKanban = newKanbanList.find((kanban) => kanban.kanbanId === kanbanId)
  if (!currentKanban) return

  const draggedItem = currentKanban[status].splice(prev, 1)[0]
  const includesItem = currentKanban[status].find((todo) => todo.todoId === draggedItem.todoId)
  if (!draggedItem || includesItem) return

  // 다른 칸반의 status로 이동
  if (nextKanbanId) {
    const nextKanban = newKanbanList.find((kanban) => kanban.kanbanId === nextKanbanId)

    if (!nextKanban) return
    const nextList = nextKanban[nextStatus]
    nextList.splice(nextList.length !== 0 ? next : 0, 0, draggedItem)

    // 같은 칸반의 다른 status로 이동
  } else if (status !== nextStatus) {
    const nextList = currentKanban[nextStatus]
    nextList.splice(nextList?.length !== 0 ? next : 0, 0, draggedItem)

    // 같은 칸반, 같은 status 내에서 순서 변경
  } else {
    currentKanban[status].splice(next, 0, draggedItem)
  }

  return newKanbanList
}
