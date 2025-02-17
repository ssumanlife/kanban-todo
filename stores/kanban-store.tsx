import { KanbanModel, TodoStatusType } from '@/types/kanban-type'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StateModel {
  kanbanList: KanbanModel[]
}

interface ActionsModel {
  addKanban: () => void
  updateKanban: (id: string, key: 'title' | 'description', value: string) => void
  deleteKanban: (id: string) => void
  setDraggedKanbanList: (list: KanbanModel[]) => void
  addTodo: (kanbanId: string, status: TodoStatusType) => void
  updateTodo: (kanbanId: string, status: TodoStatusType, todoId: string, value: string) => void
  deleteTodo: (kanbanId: string, todoId: string, status: TodoStatusType) => void
  resetKanban: () => void
}

const initialState: StateModel = {
  kanbanList: [
    {
      kanbanId: uuidv4(),
      title: '',
      description: '',
      createdAt: new Date()
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .slice(0, -1),
      todoList: [],
      inProgressList: [],
      doneList: [],
    },
  ],
}

const useKanbanStore = create(
  persist<StateModel & ActionsModel>(
    (set) => ({
      ...initialState,

      addKanban: () => {
        set((state) => ({
          kanbanList: [
            {
              kanbanId: uuidv4(),
              title: '',
              description: '',
              createdAt: new Date()
                .toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
                .slice(0, -1),
              todoList: [],
              inProgressList: [],
              doneList: [],
            },
            ...state.kanbanList,
          ],
        }))
      },

      updateKanban: (id: string, key: 'title' | 'description', value: string) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === id ? { ...kanban, [key]: value } : kanban,
          ),
        }))
      },

      deleteKanban: (id: string) => {
        set((state) => ({
          kanbanList: state.kanbanList.filter((kanban) => kanban.kanbanId !== id),
        }))
      },

      setDraggedKanbanList: (list: KanbanModel[]) => {
        set(() => ({ kanbanList: list }))
      },

      addTodo: (kanbanId: string, status: TodoStatusType) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === kanbanId
              ? {
                  ...kanban,
                  [status]: [...kanban[status], { kanbanId, todoId: uuidv4(), description: '' }],
                }
              : kanban,
          ),
        }))
      },

      updateTodo: (kanbanId: string, status: TodoStatusType, todoId: string, value: string) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === kanbanId
              ? {
                  ...kanban,
                  [status]: kanban[status].map((todo) =>
                    todo.todoId === todoId ? { ...todo, description: value } : todo,
                  ),
                }
              : kanban,
          ),
        }))
      },

      deleteTodo: (kanbanId: string, todoId: string, status: TodoStatusType) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === kanbanId
              ? {
                  ...kanban,
                  [status]: kanban[status].filter((todo) => todo.todoId !== todoId),
                }
              : kanban,
          ),
        }))
      },

      resetKanban: () => {
        set((state) => ({
          ...initialState,
          addKanban: state.addKanban,
          updateKanban: state.updateKanban,
          deleteKanban: state.deleteKanban,
          setDraggedKanbanList: state.setDraggedKanbanList,
          addTodo: state.addTodo,
          updateTodo: state.updateTodo,
          deleteTodo: state.deleteTodo,
          resetKanban: state.resetKanban,
        }))
      },
    }),
    {
      name: 'kanban-store',
    },
  ),
)

export default useKanbanStore
