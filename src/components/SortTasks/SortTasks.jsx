import React from "react";

const SortTasks = ({  prioritySort, setPrioritySort, prioritys }) => {
    return (
        <select value={prioritySort} onChange={(e) => setPrioritySort(e.target.value)} className="selectPriority">
      <option value="">Сортировать по приоритету</option>
      {prioritys.map((priority) => (
        <option key={priority.id} value={priority.id}>{priority.title }</option>
      ))}
    </select>
    )
}

export default SortTasks