import { useState } from 'react'
import './App.css'

type FormEvent = React.FormEvent<HTMLFormElement>
interface ITask {
  name: string
  done: boolean
}
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [list, setList] = useState<ITask[]>([])
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTodo(newTask)
    setNewTask('')
  }
  const addTodo = (name: string) => {
    const newTasks = [...list, { name, done: false }]
    setList(newTasks)
  }
  const toggleDone = (i: number) => {
    const newTasks = [...list]
    newTasks[i].done = !newTasks[i].done
    setList(newTasks)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => { setNewTask(e.target.value) }}
          value={newTask}
        />
        <input type="submit" value="Add" />
      </form>

      {list?.map((task, index) => {
        return (
          <li className={task.done ? "lineThrough" : ""} key={index}>{task.name}
            <button onClick={() => toggleDone(index)}>{task.done ? "\u{2714}" : "\u{274C}"}</button>
          </li>)

      })}
    </>
  )
}

export default App
