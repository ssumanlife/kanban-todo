'use client'

import useKanbanStore from '@/stores/kanban-store'

import Button from '../ui/button'

interface Props {
  children: React.ReactNode
}

const KanbanSection = ({ children }: Props) => {
  const { addKanban, resetKanban } = useKanbanStore((state) => state.actions)

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full justify-end fixed top-5 right-2 md:static">
        <Button onClick={addKanban}>칸반 추가</Button>
      </div>

      <section className="min-h-fit">{children}</section>

      <div className="flex w-full justify-end">
        <Button onClick={resetKanban} variant="border_b" className="text-sm">
          초기화
        </Button>
      </div>
    </div>
  )
}

export default KanbanSection
