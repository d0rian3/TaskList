import React, { useEffect,memo } from "react";
import DoneTaskItem from "./DoneTaskItem";
const DoneTask = memo(({ doneTasks, deleteDoneTask, prioritys }) => {

    return (
        <div  className='doneTaskList'>
            {doneTasks.length ? (
                <>
                    <span className="doneTasksHeader">Выполненые Задачи</span>
                    <ul>
                        {doneTasks.map(task => (
                            <DoneTaskItem
                                key={task.id}
                                task={task}
                                deleteDoneTask={deleteDoneTask}
                                prioritys={prioritys}
                            />
                        ))}
                    </ul>
                </>
                ) : (
                <span className="doneTasksHeader">Нет выполненых задач</span>
            )}
        </div>
    )
})

export default DoneTask