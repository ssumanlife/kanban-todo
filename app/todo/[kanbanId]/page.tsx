const Todo = ({ params }: { params: { kanbanId: string } }) => {
  const id = parseInt(params.kanbanId)
  return <div>{id}</div>
}

export default Todo
