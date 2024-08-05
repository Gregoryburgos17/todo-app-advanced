import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({ title, completed: false });
      setTitle('');
    }
  };

//   return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //     placeholder="New task"
    //   />
    //   <button type="submit">Add Task</button>
    // </form>
//   );
};

export default TaskForm;