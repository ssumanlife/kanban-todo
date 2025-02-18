import { KanbanModel, TaskStatusType } from '@/types/kanban-type'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StateModel {
  kanbanList: KanbanModel[]
}

interface ActionsModel {
  actions: {
    addKanban: () => void
    updateKanban: (id: string, key: 'title' | 'description', value: string) => void
    deleteKanban: (id: string) => void
    setDraggedKanbanList: (list: KanbanModel[]) => void
    addTask: (kanbanId: string, status: TaskStatusType) => void
    updateTask: (kanbanId: string, status: TaskStatusType, taskId: string, value: string) => void
    deleteTask: (kanbanId: string, taskId: string, status: TaskStatusType) => void
    resetKanban: () => void
  }
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

const useKanbanStore = create<StateModel & ActionsModel>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        // 칸반 추가
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

        // 칸반 title, description 업데이트
        updateKanban: (id: string, key: 'title' | 'description', value: string) => {
          set((state) => ({
            kanbanList: state.kanbanList.map((kanban) =>
              kanban.kanbanId === id ? { ...kanban, [key]: value } : kanban,
            ),
          }))
        },

        // 칸반 삭제
        deleteKanban: (id: string) => {
          set((state) => ({
            kanbanList: state.kanbanList.filter((kanban) => kanban.kanbanId !== id),
          }))
        },

        // Drag and Drop 이후 칸반 상태 업데이트
        setDraggedKanbanList: (list: KanbanModel[]) => {
          set(() => ({ kanbanList: list }))
        },

        // 타스크 추가
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

        // 타스트 description 업데이트
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

        // 타스트 삭제
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

        // 상태 초기화
        resetKanban: () => set({ ...initialState }),
      },
    }),
    {
      name: 'kanban-store',
      partialize: (state) => ({ kanbanList: state.kanbanList }),
    },
  ),
)

export default useKanbanStore
