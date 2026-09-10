import { useState } from "react";
import {
  demoButtonStyle,
  demoContainerStyle,
  demoHeaderStyle,
  demoInputStyle,
  demoMetaStyle,
  demoSectionStyle,
  demoTextStyle,
} from "./demoStyles";

function IfElseExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h3 style={{ margin: 0 }}>
        {isLoggedIn ? "Welcome back!" : "Please sign in."}
      </h3>
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#2563eb", color: "#fff" }}
        onClick={() => setIsLoggedIn((value) => !value)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </>
  );
}

function TernaryExample() {
  const [isDay, setIsDay] = useState(true);

  return (
    <>
      <h3 style={{ margin: 0 }}>{isDay ? "Good morning!" : "Good evening!"}</h3>
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#f59e0b", color: "#451a03" }}
        onClick={() => setIsDay((value) => !value)}
      >
        Toggle Time
      </button>
    </>
  );
}

function LogicalAndExample() {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [count] = useState(3);

  return (
    <>
      {hasNotifications && (
        <strong style={{ color: "#b91c1c" }}>
          You have {count} new messages.
        </strong>
      )}
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#fee2e2", color: "#991b1b" }}
        onClick={() => setHasNotifications((value) => !value)}
      >
        Toggle Notifications
      </button>
    </>
  );
}

function LogicalOrExample() {
  const [username, setUsername] = useState("");

  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username"
        style={demoInputStyle}
      />
      <h3 style={{ margin: 0 }}>Hello, {username || "Guest"}!</h3>
    </>
  );
}

function MultipleConditionsExample() {
  const [status, setStatus] = useState("pending");

  const messages = {
    pending: "Processing...",
    success: "Success!",
    error: "Error occurred!",
  };

  return (
    <>
      <strong>{messages[status]}</strong>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {["pending", "success", "error"].map((value) => (
          <button
            key={value}
            type="button"
            style={{ ...demoButtonStyle, background: "#e2e8f0", color: "#0f172a" }}
            onClick={() => setStatus(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  );
}

function SwitchExample() {
  const [role, setRole] = useState("user");

  const labels = {
    admin: "Admin dashboard",
    moderator: "Moderator panel",
    user: "User profile",
    guest: "Access denied",
  };

  return (
    <>
      <strong>{labels[role]}</strong>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {Object.keys(labels).map((value) => (
          <button
            key={value}
            type="button"
            style={{ ...demoButtonStyle, background: "#dbeafe", color: "#1d4ed8" }}
            onClick={() => setRole(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  );
}

function ConditionalStylesExample() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="button"
      style={{
        ...demoButtonStyle,
        background: isActive ? "#22c55e" : "#ef4444",
        color: "#fff",
      }}
      onClick={() => setIsActive((value) => !value)}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}

function NullRenderingExample() {
  const [showWarning, setShowWarning] = useState(true);

  return showWarning ? (
    <div
      style={{
        padding: "0.9rem",
        borderRadius: "0.8rem",
        background: "#fef3c7",
      }}
    >
      <strong>Warning:</strong> This is important.
      <button
        type="button"
        style={{ ...demoButtonStyle, marginLeft: "0.75rem", background: "#fff", color: "#92400e" }}
        onClick={() => setShowWarning(false)}
      >
        Dismiss
      </button>
    </div>
  ) : (
    <button
      type="button"
      style={{ ...demoButtonStyle, background: "#e2e8f0" }}
      onClick={() => setShowWarning(true)}
    >
      Show warning again
    </button>
  );
}

function LoadingStateExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setData(null);

    window.setTimeout(() => {
      setData({ name: "John Doe", email: "john@example.com" });
      setIsLoading(false);
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#2563eb", color: "#fff" }}
        onClick={fetchData}
      >
        Fetch Data
      </button>
      {isLoading && <p style={demoTextStyle}>Loading...</p>}
      {!isLoading && data && (
        <div>
          <p style={demoTextStyle}>Name: {data.name}</p>
          <p style={demoTextStyle}>Email: {data.email}</p>
        </div>
      )}
      {!isLoading && !data && <p style={demoTextStyle}>No data loaded yet.</p>}
    </>
  );
}

function AuthenticationFlow() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsLoading(true);

    window.setTimeout(() => {
      setIsAuthenticated(true);
      setHasPermission(true);
      setIsLoading(false);
    }, 800);
  };

  if (isLoading) {
    return <p style={demoTextStyle}>Authenticating...</p>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <h3 style={{ margin: 0 }}>Please login</h3>
        <button
          type="button"
          style={{ ...demoButtonStyle, background: "#0f172a", color: "#fff" }}
          onClick={login}
        >
          Login
        </button>
      </>
    );
  }

  if (!hasPermission) {
    return <p style={demoTextStyle}>You do not have permission.</p>;
  }

  return (
    <>
      <h3 style={{ margin: 0 }}>Welcome to the dashboard.</h3>
      <p style={demoTextStyle}>You have full access.</p>
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#e2e8f0" }}
        onClick={() => {
          setIsAuthenticated(false);
          setHasPermission(false);
        }}
      >
        Logout
      </button>
    </>
  );
}

const sections = [
  ["1. If / Else", <IfElseExample key="if" />],
  ["2. Ternary", <TernaryExample key="ternary" />],
  ["3. Logical AND", <LogicalAndExample key="and" />],
  ["4. Logical OR", <LogicalOrExample key="or" />],
  ["5. Multiple Conditions", <MultipleConditionsExample key="multiple" />],
  ["6. Switch", <SwitchExample key="switch" />],
  ["7. Conditional Styles", <ConditionalStylesExample key="styles" />],
  ["8. Null Rendering", <NullRenderingExample key="null" />],
  ["9. Loading State", <LoadingStateExample key="loading" />],
  ["10. Authentication Flow", <AuthenticationFlow key="auth" />],
];

export default function ConditionalRenderingDemo() {
  return (
    <section style={demoContainerStyle}>
      <header style={demoHeaderStyle}>
        <p style={demoMetaStyle}>Example 02</p>
        <h2 style={{ margin: 0 }}>Conditional Rendering</h2>
        <p style={demoTextStyle}>
          Casos comuns de `if`, ternario, `&&`, `||` e fluxos mais completos de interface.
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
