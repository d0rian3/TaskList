import { useEffect, useState, useCallback, useMemo, memo } from 'react'
import './App.css'
import NavComponent from './components/nav/Nav'
import useTheme from './components/hooks/useTheme'
import TaskList from './components/taskList/TaskList'
import DoneTask from './components/doneTasks/DoneTasks'
import ModalWindow from './components/Modal/ModalWindow'
import useLocalStorage from './components/hooks/useLocalStorage'

const MainComponent = memo(() => {  
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [doneTasks, setDoneTasks] = useLocalStorage('doneTasks', [])
  const [category, setCategory] = useLocalStorage('category', [])

  const prioritys = useMemo(() => [
    { id: 0, title: "Без приоритета" },
    { id: 1, title: 'Высокий' }, 
    { id: 2, title: 'Средний' },
    { id: 3, title: 'Низкий' }
  ], [])
  
  const [filterCategory, setFilterCategory] = useState('')
  const [prioritySort, setPrioritySort] = useState('')   

  const filteredTasks = useMemo(() => {
    return filterCategory
      ? tasks.filter(task => task.category === filterCategory)
      : tasks
  }, [tasks,filterCategory])

  const sortedTasks = useMemo(() => { 

    return [...filteredTasks].sort((a, b) => {
      if (!prioritySort) return a.id - b.id
      
      const sortPriority = Number(prioritySort)
      
      if (a.priority === sortPriority && b.priority !== sortPriority) return -1
      if (a.priority !== sortPriority && b.priority === sortPriority) return 1
      
      const distanceA = Math.abs(a.priority - sortPriority)
      const distanceB = Math.abs(b.priority - sortPriority)
      
      if (distanceA !== distanceB) return distanceA - distanceB
      
      return a.id - b.id
    })
  }, [filteredTasks, prioritySort])

  const addTask = useCallback(({ text, category, priority }) => {
    const newTask = {
      id: Date.now(),
      title: text,
      done: false, 
      category: category, 
      priority: priority
    }
    setTasks(prev=>[...prev, newTask])
  }, [setTasks])


  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  },[setTasks])


  const deleteDoneTask = useCallback((doneTaskId) => {
    setDoneTasks(prev => prev.filter(doneTask => doneTask.id !== doneTaskId))
  },[setDoneTasks])

  const addCategory = useCallback((text) => {
    const newCategory = {
      id: Date.now(), 
      title: text
    }
    setCategory(prev=>[...prev, newCategory])
  }, [setCategory])

  const makeTaskDone = useCallback((taskId) => {

    setTasks(prevTasks => {
      const doneTask=prevTasks.find(task=>task.id===taskId)
      if (!doneTask) return prevTasks
      
      setDoneTasks(prev => [...prev, { ...doneTask, done: true }])
      return prevTasks.filter(task => task.id !== taskId)
    })

  }, [setDoneTasks, setTasks])

  return (
    <main className='mainComponent'>
      <ModalWindow addTask={addTask} addCategory={addCategory} categorys={category} prioritys={ prioritys} />
      <div className='tasksComponent'>
        <TaskList
          tasks={sortedTasks}
          deleteTask={deleteTask}
          makeTaskDone={makeTaskDone}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categorys={category}
          prioritys={prioritys}
          prioritySort={prioritySort}
          setPrioritySort={setPrioritySort}
        />
        <DoneTask doneTasks={doneTasks} deleteDoneTask={deleteDoneTask} prioritys={prioritys} />
      </div>
    </main>
  )
})


function App() {
  const { theme, setTheme } = useTheme()
  
  return (
    <>
      <NavComponent setTheme={setTheme } />
      <MainComponent />
    </>
  )
}

export default App
