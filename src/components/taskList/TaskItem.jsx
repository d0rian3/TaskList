import {React, memo} from "react";

const TaskItem = memo(({ task, deleteTask, makeTaskDone, prioritys }) => {
    const priorityTitle = prioritys.find(p=>p.id===task.priority)?.title || "Без приоритета"
    return (
        <li className='taskItem'>
            {task.title}: Категория: {task.category || "Без категории"} Приоритет: {priorityTitle}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button style={{cursor: 'pointer'}} onClick={()=>deleteTask(task.id)}>❌</button>
                <button style={{cursor: 'pointer'}} onClick={()=>makeTaskDone(task.id)}>✅</button>
            </div>
          </li>
    )
})

export default TaskItem