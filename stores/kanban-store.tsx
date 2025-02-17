import { KanbanModel, TaskStatusType } from '@/types/kanban-type'
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
  addTask: (kanbanId: string, status: TaskStatusType) => void
  updateTask: (kanbanId: string, status: TaskStatusType, taskId: string, value: string) => void
  deleteTask: (kanbanId: string, taskId: string, status: TaskStatusType) => void
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

      addTask: (kanbanId: string, status: TaskStatusType) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === kanbanId
              ? {
                  ...kanban,
                  [status]: [...kanban[status], { kanbanId, taskId: uuidv4(), description: '' }],
                }
              : kanban,
          ),
        }))
      },

      updateTask: (kanbanId: string, status: TaskStatusType, taskId: string, value: string) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === kanbanId
              ? {
                  ...kanban,
                  [status]: kanban[status].map((task) =>
                    task.taskId === taskId ? { ...task, description: value } : task,
                  ),
                }
              : kanban,
          ),
        }))
      },

      deleteTask: (kanbanId: string, taskId: string, status: TaskStatusType) => {
        set((state) => ({
          kanbanList: state.kanbanList.map((kanban) =>
            kanban.kanbanId === kanbanId
              ? {
                  ...kanban,
                  [status]: kanban[status].filter((task) => task.taskId !== taskId),
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
          addTask: state.addTask,
          updateTask: state.updateTask,
          deleteTask: state.deleteTask,
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
