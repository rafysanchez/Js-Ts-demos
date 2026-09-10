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
