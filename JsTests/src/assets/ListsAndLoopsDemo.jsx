import { useMemo, useState } from "react";
import {
  demoButtonStyle,
  demoContainerStyle,
  demoHeaderStyle,
  demoInputStyle,
  demoMetaStyle,
  demoSectionStyle,
  demoTextStyle,
} from "./demoStyles";

function BasicListExample() {
  const fruits = ["Apple", "Banana", "Orange", "Mango"];

  return (
    <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

function BestPracticeListExample() {
  const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ];

  return (
    <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.age} years old
        </li>
      ))}
    </ul>
  );
}

function CardListExample() {
  const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 699 },
    { id: 3, name: "Tablet", price: 499 },
  ];

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      {products.map((product) => (
        <article
          key={product.id}
          style={{
            minWidth: "140px",
            padding: "0.9rem",
            borderRadius: "0.9rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <strong>{product.name}</strong>
          <p style={{ ...demoTextStyle, marginTop: "0.3rem" }}>${product.price}</p>
        </article>
      ))}
    </div>
  );
}

function NestedListExample() {
  const categories = [
    { id: 1, name: "Fruits", items: ["Apple", "Banana", "Orange"] },
    { id: 2, name: "Vegetables", items: ["Carrot", "Broccoli", "Spinach"] },
  ];

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      {categories.map((category) => (
        <div key={category.id}>
          <strong>{category.name}</strong>
          <ul style={{ marginBottom: 0 }}>
            {category.items.map((item) => (
              <li key={`${category.id}-${item}`}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function DynamicListExample() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    const nextValue = inputValue.trim();

    if (!nextValue) return;

    setItems((currentItems) => [...currentItems, nextValue]);
    setInputValue("");
  };

  return (
    <>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Add new item"
          style={{ ...demoInputStyle, maxWidth: "260px" }}
        />
        <button
          type="button"
          style={{ ...demoButtonStyle, background: "#2563eb", color: "#fff" }}
          onClick={addItem}
        >
          Add
        </button>
      </div>
      <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>
            {item}{" "}
            <button
              type="button"
              style={{ ...demoButtonStyle, padding: "0.2rem 0.55rem", background: "#fee2e2", color: "#991b1b" }}
              onClick={() =>
                setItems((currentItems) =>
                  currentItems.filter((_, itemIndex) => itemIndex !== index),
                )
              }
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function FilteredListExample() {
  const [filter, setFilter] = useState("");
  const allItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

  const filteredItems = useMemo(
    () =>
      allItems.filter((item) =>
        item.toLowerCase().includes(filter.toLowerCase()),
      ),
    [allItems, filter],
  );

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search fruits..."
        style={demoInputStyle}
      />
      <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {filteredItems.length === 0 && <p style={demoTextStyle}>No results found.</p>}
    </>
  );
}

function SortedListExample() {
  const [sortOrder, setSortOrder] = useState("asc");
  const people = [
    { id: 1, name: "Charlie", age: 35 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 30 },
  ];

  const sortedPeople = useMemo(
    () =>
      [...people].sort((left, right) =>
        sortOrder === "asc" ? left.age - right.age : right.age - left.age,
      ),
    [people, sortOrder],
  );

  return (
    <>
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#dbeafe", color: "#1d4ed8" }}
        onClick={() => setSortOrder((value) => (value === "asc" ? "desc" : "asc"))}
      >
        Sort by Age ({sortOrder})
      </button>
      <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
        {sortedPeople.map((person) => (
          <li key={person.id}>
            {person.name} - {person.age} years
          </li>
        ))}
      </ul>
    </>
  );
}

function TodoListExample() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
    { id: 3, text: "Deploy to production", completed: false },
  ]);

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() =>
            setTodos((currentTodos) =>
              currentTodos.map((item) =>
                item.id === todo.id
                  ? { ...item, completed: !item.completed }
                  : item,
              ),
            )
          }
          style={{
            padding: "0.85rem",
            borderRadius: "0.8rem",
            background: todo.completed ? "#dcfce7" : "#f8fafc",
            textDecoration: todo.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
        >
          {todo.completed ? "Done" : "Open"} - {todo.text}
        </li>
      ))}
    </ul>
  );
}

function PaginatedListExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const allItems = Array.from({ length: 23 }, (_, index) => `Item ${index + 1}`);
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const currentItems = allItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          disabled={currentPage === 1}
          style={{ ...demoButtonStyle, background: "#e2e8f0" }}
          onClick={() => setCurrentPage((value) => value - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          type="button"
          disabled={currentPage === totalPages}
          style={{ ...demoButtonStyle, background: "#e2e8f0" }}
          onClick={() => setCurrentPage((value) => value + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

function TableExample() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" },
  ]);

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Name</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Email</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Role</th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderTop: "1px solid #e2e8f0" }}>
              <td style={{ padding: "0.75rem" }}>{user.name}</td>
              <td style={{ padding: "0.75rem" }}>{user.email}</td>
              <td style={{ padding: "0.75rem" }}>{user.role}</td>
              <td style={{ padding: "0.75rem" }}>
                <button
                  type="button"
                  style={{ ...demoButtonStyle, background: "#fee2e2", color: "#991b1b" }}
                  onClick={() =>
                    setUsers((currentUsers) =>
                      currentUsers.filter((item) => item.id !== user.id),
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sections = [
  ["1. Basic Mapping", <BasicListExample key="basic" />],
  ["2. Stable Keys", <BestPracticeListExample key="keys" />],
  ["3. Cards", <CardListExample key="cards" />],
  ["4. Nested Lists", <NestedListExample key="nested" />],
  ["5. Dynamic Add / Remove", <DynamicListExample key="dynamic" />],
  ["6. Filtering", <FilteredListExample key="filter" />],
  ["7. Sorting", <SortedListExample key="sort" />],
  ["8. Todo Toggle", <TodoListExample key="todo" />],
  ["9. Pagination", <PaginatedListExample key="pagination" />],
  ["10. Table with Actions", <TableExample key="table" />],
];

export default function ListsAndLoopsDemo() {
  return (
    <section style={demoContainerStyle}>
      <header style={demoHeaderStyle}>
        <p style={demoMetaStyle}>Example 03</p>
        <h2 style={{ margin: 0 }}>Lists and Loops</h2>
        <p style={demoTextStyle}>
          Mapeamento, chaves, filtros, ordenacao, paginacao e acoes em colecoes.
        </p>
      </header>

      {sections.map(([title, content]) => (
        <article key={title} style={demoSectionStyle}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          {content}
        </article>
      ))}
    </section>
  );
}
