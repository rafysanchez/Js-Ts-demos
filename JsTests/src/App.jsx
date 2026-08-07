import {
  createContext,
  useContext,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import AboutYouProfile from "./AboutYouProfile";
import "./App.css";

const STORAGE_KEY = "hooks-study-board";

const ThemeContext = createContext(null);

const mockTasks = [
  {
    id: 1,
    title: "Revisar hooks do React",
    area: "Frontend",
    priority: "alta",
    status: "todo",
    owner: "Ana",
    points: 5,
  },
  {
    id: 2,
    title: "Criar mocks da API de pedidos",
    area: "Backend",
    priority: "media",
    status: "doing",
    owner: "Bruno",
    points: 3,
  },
  {
    id: 3,
    title: "Validar filtros no dashboard",
    area: "Data",
    priority: "alta",
    status: "done",
    owner: "Carla",
    points: 8,
  },
  {
    id: 4,
    title: "Escrever testes do carrinho",
    area: "QA",
    priority: "media",
    status: "todo",
    owner: "Diego",
    points: 2,
  },
  {
    id: 5,
    title: "Melhorar loading da busca",
    area: "Frontend",
    priority: "baixa",
    status: "doing",
    owner: "Elisa",
    points: 1,
  },
  {
    id: 6,
    title: "Documentar fluxo de login",
    area: "Produto",
    priority: "baixa",
    status: "todo",
    owner: "Felipe",
    points: 2,
  },
];

const initialBoardState = {
  tasks: mockTasks,
  filter: "all",
};

function boardReducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        tasks: action.payload?.tasks?.length ? action.payload.tasks : mockTasks,
        filter: action.payload?.filter ?? "all",
      };
    case "add":
      return {
        ...state,
        tasks: [{ ...action.payload, id: Date.now() }, ...state.tasks],
      };
    case "toggle-status":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                status:
                  task.status === "todo"
                    ? "doing"
                    : task.status === "doing"
                      ? "done"
                      : "todo",
              }
            : task,
        ),
      };
    case "remove":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "set-filter":
      return {
        ...state,
        filter: action.payload,
      };
    case "reset":
      return initialBoardState;
    default:
      return state;
  }
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("warm");

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => (current === "warm" ? "ocean" : "warm")),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }

  return context;
}

function StudyBoard() {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState({
    title: "",
    area: "Frontend",
    priority: "media",
    owner: "",
    points: 1,
  });
  const deferredQuery = useDeferredValue(query);
  const titleId = useId();
  const ownerId = useId();
  const searchId = useId();
  const titleRef = useRef(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      hydratedRef.current = true;
      return;
    }

    try {
      dispatch({ type: "hydrate", payload: JSON.parse(saved) });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      hydratedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return state.tasks.filter((task) => {
      const matchesFilter =
        state.filter === "all" ? true : task.status === state.filter;
      const matchesQuery =
        normalizedQuery.length === 0
          ? true
          : [task.title, task.area, task.owner, task.priority]
              .join(" ")
              .toLowerCase()
              .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [deferredQuery, state.filter, state.tasks]);

  const stats = useMemo(() => {
    const total = state.tasks.length;
    const done = state.tasks.filter((task) => task.status === "done").length;
    const doing = state.tasks.filter((task) => task.status === "doing").length;
    const high = state.tasks.filter((task) => task.priority === "alta").length;
    const points = state.tasks.reduce((sum, task) => sum + task.points, 0);

    return { total, done, doing, high, points };
  }, [state.tasks]);

  const addTask = (event) => {
    event.preventDefault();

    const title = draft.title.trim();
    const owner = draft.owner.trim();

    if (!title || !owner) {
      titleRef.current?.focus();
      return;
    }

    dispatch({
      type: "add",
      payload: {
        title,
        owner,
        area: draft.area,
        priority: draft.priority,
        status: "todo",
        points: Number(draft.points),
      },
    });

    setDraft((current) => ({
      ...current,
      title: "",
      owner: "",
      points: 1,
    }));
    titleRef.current?.focus();
  };

  return (
    <>
      <section className="section-intro">
        <div>
          <p className="panel-kicker">useReducer + useDeferredValue</p>
          <h2>Painel de tarefas</h2>
        </div>
        <button
          type="button"
          className="ghost-button"
          onClick={() => dispatch({ type: "reset" })}
        >
          Resetar mocks
        </button>
      </section>

      <section className="stats-grid">
        <StatCard label="Total" value={stats.total} hint="useMemo" />
        <StatCard label="Em progresso" value={stats.doing} hint="useReducer" />
        <StatCard label="Concluidas" value={stats.done} hint="useEffect" />
        <StatCard label="Prioridade alta" value={stats.high} hint="useContext" />
        <StatCard label="Story points" value={stats.points} hint="useState" />
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-head">
            <div>
              <p className="panel-kicker">useState + useRef + useId</p>
              <h2>Nova tarefa</h2>
            </div>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <label htmlFor={titleId}>Titulo</label>
            <input
              ref={titleRef}
              id={titleId}
              type="text"
              placeholder="Ex: revisar useReducer"
              value={draft.title}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
            />

            <label htmlFor={ownerId}>Responsavel</label>
            <input
              id={ownerId}
              type="text"
              placeholder="Ex: Maria"
              value={draft.owner}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  owner: event.target.value,
                }))
              }
            />

            <div className="inline-fields">
              <div>
                <label>Area</label>
                <select
                  value={draft.area}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      area: event.target.value,
                    }))
                  }
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Data</option>
                  <option>QA</option>
                  <option>Produto</option>
                </select>
              </div>

              <div>
                <label>Prioridade</label>
                <select
                  value={draft.priority}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      priority: event.target.value,
                    }))
                  }
                >
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baixa">Baixa</option>
                </select>
              </div>

              <div>
                <label>Pontos</label>
                <input
                  type="number"
                  min="1"
                  max="13"
                  value={draft.points}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      points: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <button type="submit" className="primary-button">
              Adicionar tarefa
            </button>
          </form>
        </article>

        <article className="panel panel-wide">
          <div className="panel-head">
            <div>
              <p className="panel-kicker">useDeferredValue + useMemo</p>
              <h2>Lista filtrada</h2>
            </div>
            <span className="pill">{filteredTasks.length} resultados</span>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <label htmlFor={searchId}>Buscar</label>
              <input
                id={searchId}
                type="text"
                placeholder="Busque por titulo, area, pessoa..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className="filters">
              {["all", "todo", "doing", "done"].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={state.filter === status ? "active-filter" : ""}
                  onClick={() => dispatch({ type: "set-filter", payload: status })}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <ul className="task-list">
            {filteredTasks.length === 0 ? (
              <li className="empty-state">
                Nenhum item encontrado com os filtros atuais.
              </li>
            ) : (
              filteredTasks.map((task) => (
                <li key={task.id} className="task-card">
                  <div className="task-main">
                    <div className="task-row">
                      <strong>{task.title}</strong>
                      <span className={`priority-chip ${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p>
                      {task.area} - {task.owner} - {task.points} pts
                    </p>
                  </div>

                  <div className="task-actions">
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() =>
                        dispatch({ type: "toggle-status", payload: task.id })
                      }
                    >
                      {task.status}
                    </button>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => dispatch({ type: "remove", payload: task.id })}
                    >
                      remover
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </article>
      </section>

      <section className="hooks-note">
        <h3>Hooks usados neste exemplo</h3>
        <p>
          <strong>useState</strong> no formulario e busca,{" "}
          <strong>useReducer</strong> na lista, <strong>useEffect</strong> na
          persistencia, <strong>useMemo</strong> para estatisticas e filtro,{" "}
          <strong>useDeferredValue</strong> na busca, <strong>useRef</strong>{" "}
          para focar o input, <strong>useContext</strong> para o tema e{" "}
          <strong>useId</strong> para acessibilidade.
        </p>
      </section>
    </>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </article>
  );
}

function AppShell() {
  const [activeView, setActiveView] = useState("board");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <main className="app-shell">
      <section className="board">
        <header className="hero">
          <div>
            <p className="eyebrow">React Hooks Lab</p>
            <h1>Painel de Estudo com Hooks</h1>
            <p className="subtitle">
              Um laboratorio com lista de tarefas e um novo formulario complexo
              para contar a historia de vida do usuario.
            </p>
          </div>

          <div className="hero-actions">
            <button type="button" className="ghost-button" onClick={toggleTheme}>
              Tema: {theme}
            </button>
            <button
              type="button"
              className={activeView === "board" ? "primary-button" : "ghost-button"}
              onClick={() => setActiveView("board")}
            >
              Painel de tarefas
            </button>
            <button
              type="button"
              className={activeView === "profile" ? "primary-button" : "ghost-button"}
              onClick={() => setActiveView("profile")}
            >
              Fale de voce
            </button>
          </div>
        </header>

        {activeView === "board" ? <StudyBoard /> : <AboutYouProfile />}
      </section>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App;
