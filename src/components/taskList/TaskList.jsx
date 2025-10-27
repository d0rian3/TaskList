import {React, memo} from "react";
import TaskItem  from "./TaskItem.jsx";
import FilterTasks from "../FilterTasks/FilterTasks.jsx";
import SortTasks from '../SortTasks/SortTasks.jsx'
const TaskList = memo((
  { tasks, deleteTask, makeTaskDone, filterCategory, setFilterCategory, categorys, prioritys, prioritySort, setPrioritySort }) => {
  
  return (
    <div className='taskList'>
                <div className="taskListHeader">
                  <span className="doneTasksHeader">Ваши Задачи</span>
                  <FilterTasks
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    categorys={categorys}
                  />
                  <SortTasks
                    prioritySort={prioritySort}
                    setPrioritySort={setPrioritySort}
                    prioritys={prioritys}
                  />
                </div>
                {tasks.length ? (
                <>  
                <ul>
                    {tasks.map(task => (
                      <TaskItem key={task.id} task={task} deleteTask={deleteTask} makeTaskDone={makeTaskDone} prioritys={ prioritys} />
                ))}
                  </ul>
                </>
                ) :
                  (<></>
                          
                  )}
            </div>
  )
})

export default TaskList