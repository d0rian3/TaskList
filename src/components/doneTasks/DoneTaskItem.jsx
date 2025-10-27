import React from "react";

const DoneTaskItem = ({ task, deleteDoneTask, prioritys, }) => {
    const priorityTitle = prioritys.find(p => p.id === task.priority)?.title || "Без приоритета";
    return (
        <li className="taskItem">
            {task.title}: Категория: {task.category || "Без категории"} Приоритет: {priorityTitle}
            <div>
                <button style={{cursor: 'pointer'}} onClick={() => deleteDoneTask(task.id)}>❌</button>
            </div>
        </li>
    )
}

export default DoneTaskItem