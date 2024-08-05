import React from 'react';
import { useTasks } from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => updateTask(task.id, { completed: !task.completed })}
      />
      <span>{task.title}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;