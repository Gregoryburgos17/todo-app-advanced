import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../../context/TaskContext';


const columns = {
  'to-do': 'To do',
  'doing': 'Doing',
  'reviews': 'Reviews',
  'done': 'Done'
};

const TaskList = () => {
  const { tasks, updateTaskStatus, addTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const taskId = result.draggableId;
    const newStatus = destination.droppableId;

    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({ title: newTaskTitle, status: 'to-do' });
      setNewTaskTitle('');
    }
  };

  return (
    <div className="task-list">
      <h2>Proyectos</h2>
      <h3>Tareas</h3>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task"
          className="task-input"
        />
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-container">
          {Object.entries(columns).map(([columnId, title]) => (
            <div key={columnId} className="task-column">
              <h4>{title}</h4>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="task-list-ul"
                  >
                    {tasks
                      .filter(task => task.status === columnId)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-item"
                            >
                              {task.title}
                            </li>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <button 
                className="add-card-btn"
                onClick={() => addTask({ title: 'New task', status: columnId })}
              >
                + Add a card
              </button>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskList;