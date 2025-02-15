import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TodoModel {
  kanbanId: number
  todoId: number
  description: string
  createdAt: Date
  status: 'todo' | 'inProgress' | 'done'
}

export interface KanbanModel {
  kanbanId: number
  title: string
  description: string
  createdAt: string
  todoList: TodoModel[]
  inProgressList: TodoModel[]
  doneList: TodoModel[]
}

interface StateModel {
  kanbanList: KanbanModel[]
}

interface ActionsModel {
  addKanban: () => void
  updateKanban: (id: number, key: 'title' | 'description', value: string) => void
  setDraggedKanbanList: (list: KanbanModel[]) => void
  resetKanban: () => void
}

const initialState: StateModel = {
  kanbanList: [
    {
      kanbanId: 1,
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
              kanbanId: state.kanbanList.length + 1,
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

      updateKanban: (id: number, key: 'title' | 'description', value: string) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === id ? { ...kanban, [key]: value } : kanban,
          ),
        }))
      },

      setDraggedKanbanList: (list: KanbanModel[]) => {
        set(() => ({ kanbanList: list }))
      },

      resetKanban: () => {
        set((state) => ({
          ...initialState,
          addKanban: state.addKanban,
          updateKanban: state.updateKanban,
          setDraggedKanbanList: state.setDraggedKanbanList,
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
