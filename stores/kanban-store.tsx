import { v4 as uuidv4 } from 'uuid'
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
  kanbanId: string
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
  updateKanban: (id: string, key: 'title' | 'description', value: string) => void
  deleteKanban: (id: string) => void
  setDraggedKanbanList: (list: KanbanModel[]) => void
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

      resetKanban: () => {
        set((state) => ({
          ...initialState,
          addKanban: state.addKanban,
          updateKanban: state.updateKanban,
          deleteKanban: state.deleteKanban,
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
