import { useMemo, useState } from "react";

const containerStyle = {
  display: "grid",
  gap: "1rem",
};

const cardStyle = {
  padding: "1rem",
  borderRadius: "1rem",
  background: "rgba(255, 255, 255, 0.72)",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: "0 18px 35px rgba(15, 23, 42, 0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem 0.9rem",
  borderRadius: "0.8rem",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  fontSize: "0.95rem",
  boxSizing: "border-box",
};

const buttonBaseStyle = {
  border: "none",
  borderRadius: "0.8rem",
  padding: "0.8rem 1rem",
  fontWeight: 700,
  cursor: "pointer",
};

const initialTasks = [
  {
    id: 1,
    title: "Learn React Basics",
    category: "Learning",
    completed: false,
    priority: "high",
  },
  {
    id: 2,
    title: "Build a project",
    category: "Development",
    completed: false,
    priority: "medium",
  },
];

const priorityMeta = {
  high: { label: "High", color: "#dc2626", background: "#fee2e2" },
  medium: { label: "Medium", color: "#d97706", background: "#fef3c7" },
  low: { label: "Low", color: "#15803d", background: "#dcfce7" },
};

function TaskManagerDemo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "medium",
  });
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showForm, setShowForm] = useState(false);

  const filteredTasks = useMemo(() => {
    let nextTasks = tasks;

    if (filter === "active") {
      nextTasks = nextTasks.filter((task) => !task.completed);
    } else if (filter === "completed") {
      nextTasks = nextTasks.filter((task) => task.completed);
    }

    if (searchTerm.trim()) {
      const normalizedSearch = searchTerm.toLowerCase();
      nextTasks = nextTasks.filter((task) =>
        `${task.title} ${task.category}`
          .toLowerCase()
          .includes(normalizedSearch),
      );
    }

    const sortableTasks = [...nextTasks];

    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      sortableTasks.sort(
        (left, right) => priorityOrder[left.priority] - priorityOrder[right.priority],
      );
    } else if (sortBy === "title") {
      sortableTasks.sort((left, right) => left.title.localeCompare(right.title));
    }

    return sortableTasks;
  }, [filter, searchTerm, sortBy, tasks]);

  const taskStats = useMemo(() => {
    const active = tasks.filter((task) => !task.completed).length;
    const completed = tasks.length - active;

    return {
      total: tasks.length,
      active,
      completed,
    };
  }, [tasks]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      window.alert("Please enter a task title");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: formData.title.trim(),
      category: formData.category.trim() || "General",
      priority: formData.priority,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setFormData({ title: "", category: "", priority: "medium" });
    setShowForm(false);
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
  };

  return (
    <section style={containerStyle}>
      <header style={{ ...cardStyle, display: "grid", gap: "0.4rem" }}>
        <p style={{ margin: 0, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#475569" }}>
          Example 05
        </p>
        <h2 style={{ margin: 0 }}>Task Manager Demo</h2>
        <p style={{ margin: 0, color: "#475569" }}>
          Um demo completo com eventos, renderizacao condicional, listas e formularios controlados.
        </p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        <StatCard label="Total Tasks" value={taskStats.total} tone="#dbeafe" />
        <StatCard label="Active" value={taskStats.active} tone="#fef3c7" />
        <StatCard label="Completed" value={taskStats.completed} tone="#dcfce7" />
      </section>

      <div style={cardStyle}>
        <button
          type="button"
          onClick={() => setShowForm((currentValue) => !currentValue)}
          style={{
            ...buttonBaseStyle,
            width: "100%",
            background: showForm ? "#e2e8f0" : "#2563eb",
            color: showForm ? "#0f172a" : "#fff",
          }}
        >
          {showForm ? "Cancel" : "Add New Task"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ ...cardStyle, display: "grid", gap: "0.85rem" }}>
          <h3 style={{ margin: 0 }}>New Task</h3>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Task title"
            style={inputStyle}
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {Object.entries(priorityMeta).map(([priorityKey, meta]) => (
              <label key={priorityKey} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <input
                  type="radio"
                  name="priority"
                  value={priorityKey}
                  checked={formData.priority === priorityKey}
                  onChange={handleInputChange}
                />
                {meta.label}
              </label>
            ))}
          </div>

          <button
            type="submit"
            style={{ ...buttonBaseStyle, background: "#0f172a", color: "#fff" }}
          >
            Save Task
          </button>
        </form>
      )}

      <section style={{ ...cardStyle, display: "grid", gap: "0.85rem" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search tasks..."
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            style={{ ...inputStyle, width: "auto", minWidth: "160px" }}
          >
            <option value="all">All Tasks</option>
            <option value="active">Active Only</option>
            <option value="completed">Completed Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            style={{ ...inputStyle, width: "auto", minWidth: "160px" }}
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>

          {taskStats.completed > 0 && (
            <button
              type="button"
              onClick={clearCompleted}
              style={{ ...buttonBaseStyle, background: "#dc2626", color: "#fff" }}
            >
              Clear Completed
            </button>
          )}
        </div>
      </section>

      <section style={{ display: "grid", gap: "0.75rem" }}>
        {filteredTasks.length === 0 ? (
          <div style={{ ...cardStyle, textAlign: "center", color: "#64748b" }}>
            {searchTerm
              ? "No tasks match your search."
              : filter === "completed"
                ? "No completed tasks yet."
                : "No tasks yet. Add one to get started."}
          </div>
        ) : (
          filteredTasks.map((task) => {
            const priority = priorityMeta[task.priority];

            return (
              <article
                key={task.id}
                style={{
                  ...cardStyle,
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  background: task.completed ? "rgba(226, 232, 240, 0.8)" : cardStyle.background,
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <div style={{ flex: 1 }}>
                  <strong
                    style={{
                      display: "block",
                      marginBottom: "0.3rem",
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "#64748b" : "#0f172a",
                    }}
                  >
                    {task.title}
                  </strong>
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", color: "#475569", fontSize: "0.9rem" }}>
                    <span>{task.category}</span>
                    <span
                      style={{
                        background: priority.background,
                        color: priority.color,
                        borderRadius: "999px",
                        padding: "0.2rem 0.65rem",
                        fontWeight: 700,
                      }}
                    >
                      {priority.label}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  style={{ ...buttonBaseStyle, background: "#fee2e2", color: "#b91c1c" }}
                >
                  Delete
                </button>
              </article>
            );
          })
        )}
      </section>
    </section>
  );
}

function StatCard({ label, value, tone }) {
  return (
    <article style={{ ...cardStyle, background: tone }}>
      <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "0.3rem" }}>
        {label}
      </div>
      <strong style={{ fontSize: "2rem", color: "#0f172a" }}>{value}</strong>
    </article>
  );
}

export default TaskManagerDemo;
