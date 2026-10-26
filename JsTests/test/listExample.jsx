import React from "react";

function TaskList({ tasks = [] }) {
  return (
    <div className="card-container">
      <h3>Minhas Tarefas</h3>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={`${task.id}-${index}`}
            data-testid="task-item"
            className={task.completed ? "completed" : "pending"}
          >
            <span data-testid="task-title">{task.title}</span>
            <span data-testid="task-status">
              {task.completed ? "Concluída" : "Pendente"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

// Example of how to import and use the TaskList component in another React file
/* 
// App.jsx
import React from 'react';
import TaskList from './TaskList';

const sampleTasks = [
  { id: 1, title: 'Estudar React', completed: true },
  { id: 2, title: 'Fazer exercícios', completed: false },
  { id: 3, title: 'Ler documentação', completed: true },
];

function App() {
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <TaskList tasks={sampleTasks} />
    </div>
  );
}

export default App; 
 */
