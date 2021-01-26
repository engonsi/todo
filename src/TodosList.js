import { useState, useEffect } from 'react'

import './Todo.css'
import Task from './Task'
import Header from './Header'

const TodosList = () => {
  const initialState = JSON.parse(localStorage.getItem('myTasks')) || []

  const [tasks, setTasks] = useState(initialState)
  const [task, setTask] = useState('')
  const [taskView, setTaskView] = useState(tasks)
  const [filter, setFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [entryHeight, setEntryHeight] = useState(0)

  const doneToggle = (id) => {
    const tasksCopy = [...tasks]
    const task = tasksCopy.filter((task) => task.id === id)
    task[0].done = !task[0].done
    setTasks(tasksCopy)
  }

  const pinnedToggle = (id) => {
    const tasksCopy = [...tasks]
    const task = tasksCopy.filter((task) => task.id === id)
    task[0].pinned = !task[0].pinned
    if (task[0].pinned) {
      const idx = tasksCopy.indexOf(...task)
      tasksCopy.splice(idx, 1)
      tasksCopy.unshift(...task)
    } else {
      tasksCopy.push(tasksCopy.shift())
    }
    setTasks(tasksCopy)
  }

  const addTask = () => {
    let maxId = 0
    let theTitle = ''
    let category = ''
    let title = ''
    const idArr = tasks.map((task) => task.id)
    if (idArr.length !== 0) {
      maxId = Math.max(...idArr)
    }
    if (task) {
      if (task.indexOf(':') !== -1) {
        theTitle = task.split(':')
        category = theTitle.shift().trim()
        title = theTitle.join(':').trim()
      } else {
        title = task
        category =
          ['all', 'done', 'active'].indexOf(filter) === -1 ? filter : ''
      }

      let newTask = {
        id: maxId + 1,
        title: title,
        category: category,
        done: false,
        pinned: false,
        timestamp: new Date(),
      }
      if (title !== '' && ['all', 'done', 'active'].indexOf(category) === -1) {
        setTasks([...tasks, newTask])
        setTask('')
        setFilter('all')
      }
    }
  }

  const delTask = (id) => {
    const remaining = tasks.filter((task) => task.id !== id)
    setTasks(remaining)
  }

  const getFinished = () => {
    if (tasks) {
      let count = tasks.reduce((total, task) => {
        var finished = task.done ? 1 : 0
        return total + finished
      }, 0)
      return `${count} / ${tasks.length}`
    }
  }

  const filteredTasks = (type) => {
    const newFiltered = [...tasks]

    switch (type) {
      case 'all':
        setTaskView(newFiltered)
        setFilter('all')
        break
      case 'done':
        setTaskView(
          newFiltered.filter((task) => task.done !== false || task.pinned)
        )
        setFilter('done')
        break
      case 'active':
        setTaskView(
          newFiltered.filter((task) => task.done === false || task.pinned)
        )
        setFilter('active')
        break
      default:
        setTaskView(newFiltered.filter((task) => task.category === type))
        setFilter(type)
    }
  }

  const checkTask = (e) => {
    let theTitle = e.target.value
    setTask(theTitle.toLowerCase())

    if (task.indexOf(':') !== -1) {
      return filteredTasks(task.split(':')[0])
    }

    const newFiltered = [...tasks]
    setTaskView(
      newFiltered.filter((task) =>
        task.title.toLowerCase().includes(theTitle.toLowerCase())
      )
    )
  }

  // eslint-disable-next-line
  const getCats = () => {
    let categories = ['all', 'done', 'active']
    tasks.map((task) => categories.push(task.category))
    let uniqueCats = [...new Set(categories)].filter((cat) => cat !== '')
    return uniqueCats.map((cat, idx) => (
      <li
        key={idx}
        onClick={() => filteredTasks(cat)}
        className={filter.includes(cat) ? 'active' : ''}>
        {cat}
      </li>
    ))
    //console.log(uniqueCats)
  }

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks))
    filteredTasks(filter)
    // eslint-disable-next-line
  }, [tasks])

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      window.matchMedia('(display-mode: standalone)').matches
    ) {
      // true for mobile device
      setIsMobile(true)
      let taskEntry = document.getElementById('taskEntry').clientHeight
      setEntryHeight(taskEntry)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <h1 className='noselect taskCount'>myTodo {getFinished()}</h1>
      <div
        className='container'
        style={{ padding: `100px 0 ${entryHeight * 1.1 + 80}px` }}>
        <Header
          task={task}
          checkTask={checkTask}
          addTask={addTask}
          getCats={getCats}
          isMobile={isMobile}
        />
        <Task
          taskView={taskView}
          doneToggle={doneToggle}
          delTask={delTask}
          pinnedToggle={pinnedToggle}
        />
      </div>
    </>
  )
}

export default TodosList
