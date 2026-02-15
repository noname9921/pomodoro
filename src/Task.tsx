import { useEffect, useReducer } from "react";
import TaskDialog from "./Dialog";
import { motion, AnimatePresence } from 'framer-motion'
import Tick from './assets/tick.svg?react'
import Delete from './assets/del.svg?react'

type Task = {
  name: string,
  desc: string, 
  id: string,
  completed: boolean
}

export type Action =
| { type: 'add', task: Task }
| { type: 'delete', id: string }
| { type: 'edit', id: string, update: Partial<Task> }
| { type: 'toggle', id: string }

function reduceTask(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add': 
      return [...state, action.task]
    case 'delete': 
      return state.filter(t => t.id != action.id)
    case 'edit': 
      return state.map(t => 
        t.id == action.id ? {...t, ...action.update} : t
      )
    case 'toggle': 
    return state.map(t => 
      t.id === action.id ? {...t, completed: !t.completed} : t
    )
    default: return state
  }
}

export default function Tasks() {
  const [tasks, dispatch] = useReducer(reduceTask, [], () => JSON.parse(localStorage.getItem('tasks') || '[]').filter((t: Task) => !t.completed))
  const sortedTask = [
    ...tasks.filter(t => !t.completed),
    ...tasks.filter(t => t.completed)
  ]

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  return (
    <div 
    className="parent"
    >
      <TaskDialog dispatch={dispatch}/>
      <AnimatePresence>
        {
        sortedTask.map(t => 
        <motion.div className="tasks"
        data-completed={t.completed}
        key={t.id}
        initial={{ opacity: 0, x: -10 }}
        exit={{ opacity: 0, x: 10 }}
        animate={{ opacity: t.completed ? .75 : 1, x: 0 }}
        transition={{ duration: 0.25 }}
        layout>
          <div className="task-content">
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
          </div>
          <div className="buttons">
            <button onClick={() => dispatch({ type: 'delete', id: t.id})}><Delete /></button>
            <button onClick={() => dispatch({ type: "toggle", id: t.id })}><Tick /></button>
          </div>
        </motion.div>)
      }
      </AnimatePresence>
    </div>
  )
  
}