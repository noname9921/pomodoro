import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import type { Dispatch } from 'react'
import type { Action } from './Task.tsx'

type DialogTaskProps = {
  dispatch: Dispatch<Action>
}

export default function TaskDialog({dispatch}: DialogTaskProps) {
  const [open, setOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Form submitted')
    setOpen(false)
    const task = {
      name: taskName,
      desc: taskDescription,
      id: crypto.randomUUID(),
      completed: false
    }
    dispatch({type: 'add', 'task': task})
  }

  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <button id='AddTask'>+ Add Task</button>
    </Dialog.Trigger>
    
    <Dialog.Portal>
      <Dialog.Overlay className='overlay'/>

      <Dialog.Content className='content'>
        <div id="dialogHeader">
          <Dialog.Title id="taskTitle">Add Task</Dialog.Title>
          <Dialog.Close asChild>
            <button type="button" id="cancelButton">x</button>
          </Dialog.Close>
        </div>
        <Dialog.Description id="taskDescript">
          Add your tasks here and classify their urgency, importance, their name and description.
        </Dialog.Description>
        <form onSubmit={handleSubmit}>
          <label htmlFor="TaskName"><strong>Name: </strong></label><br />
          <input type="text" id="TaskName" onChange={
            (e) => {
              setTaskName(e.currentTarget.value)
            }
          } placeholder='Enter your task name here...'/><br />

          <label htmlFor="TaskDesc"><strong>Description: </strong></label><br />
          <textarea id="TaskDesc" onChange={
            (e) => {
              setTaskDescription(e.currentTarget.value)
            }
          } placeholder="Enter your task description here..." /><br />

          <button type="submit">Add</button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}