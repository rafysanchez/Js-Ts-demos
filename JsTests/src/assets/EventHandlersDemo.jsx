import { useState } from "react";
import {
  demoButtonStyle,
  demoCardStyle,
  demoContainerStyle,
  demoHeaderStyle,
  demoMetaStyle,
  demoSectionStyle,
  demoTextStyle,
  demoInputStyle,
} from "./demoStyles";

function BasicClickExample() {
  return (
    <button
      type="button"
      style={{ ...demoButtonStyle, background: "#2563eb", color: "#fff" }}
      onClick={() => window.alert("Button clicked!")}
    >
      Click Me
    </button>
  );
}

function InlineHandlerExample() {
  return (
    <button
      type="button"
      style={{ ...demoButtonStyle, background: "#0f172a", color: "#fff" }}
      onClick={() => window.alert("Inline click!")}
    >
      Run Inline Action
    </button>
  );
}

function EventParameterExample() {
  const [log, setLog] = useState("Click the button to inspect the event.");

  const handleClick = (event) => {
    setLog(`type=${event.type} | tag=${event.target.tagName.toLowerCase()}`);
    console.log("Event:", event);
  };

  return (
    <>
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#7c3aed", color: "#fff" }}
        onClick={handleClick}
      >
        Inspect Event
      </button>
      <p style={demoTextStyle}>{log}</p>
    </>
  );
}

function HandlerWithArgsExample() {
  const [message, setMessage] = useState("Choose a greeting.");

  const greet = (name) => {
    setMessage(`Hello, ${name}!`);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button
          type="button"
          style={{ ...demoButtonStyle, background: "#14b8a6", color: "#042f2e" }}
          onClick={() => greet("Alice")}
        >
          Greet Alice
        </button>
        <button
          type="button"
          style={{ ...demoButtonStyle, background: "#f59e0b", color: "#451a03" }}
          onClick={() => greet("Bob")}
        >
          Greet Bob
        </button>
      </div>
      <p style={demoTextStyle}>{message}</p>
    </>
  );
}

function MultipleEventsExample() {
  const [status, setStatus] = useState("No interaction yet.");

  return (
    <>
      <input
        type="text"
        placeholder="Type something..."
        style={demoInputStyle}
        onFocus={() => setStatus("Input focused")}
        onBlur={() => setStatus("Input blurred")}
        onChange={(event) => setStatus(`Typing: ${event.target.value}`)}
      />
      <p style={demoTextStyle}>{status}</p>
    </>
  );
}

function PreventDefaultExample() {
  const [message, setMessage] = useState("Submit the form.");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Form submitted without reload.");
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input type="text" placeholder="Enter name" style={{ ...demoInputStyle, maxWidth: "260px" }} />
        <button
          type="submit"
          style={{ ...demoButtonStyle, background: "#2563eb", color: "#fff" }}
        >
          Submit
        </button>
      </form>
      <p style={demoTextStyle}>{message}</p>
    </>
  );
}

function EventPropagationExample() {
  const [message, setMessage] = useState("Click the child button.");

  return (
    <div
      onClick={() => setMessage("Parent div clicked")}
      style={{
        ...demoCardStyle,
        background: "#e2e8f0",
        cursor: "pointer",
      }}
    >
      <button
        type="button"
        style={{ ...demoButtonStyle, background: "#fff", color: "#0f172a" }}
        onClick={(event) => {
          event.stopPropagation();
          setMessage("Child button clicked without bubbling");
        }}
      >
        Child Button
      </button>
      <p style={{ ...demoTextStyle, marginTop: "0.75rem" }}>{message}</p>
    </div>
  );
}

function KeyboardEventsExample() {
  const [message, setMessage] = useState("Press any key.");

  return (
    <>
      <input
        type="text"
        placeholder="Press a key..."
        style={demoInputStyle}
        onKeyDown={(event) => {
          const prefix = event.key === "Enter" ? "Enter detected" : "Key pressed";
          setMessage(`${prefix}: ${event.key}`);
        }}
      />
      <p style={demoTextStyle}>{message}</p>
    </>
  );
}

function MouseEventsExample() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(event) =>
        setPosition({ x: event.clientX, y: event.clientY })
      }
      style={{
        ...demoCardStyle,
        minHeight: "120px",
        background: "#dbeafe",
      }}
    >
      <strong>Mouse position</strong>
      <p style={{ ...demoTextStyle, marginTop: "0.5rem" }}>
        X: {position.x} | Y: {position.y}
      </p>
    </div>
  );
}

function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ marginTop: 0 }}>Count: {count}</h3>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button type="button" style={{ ...demoButtonStyle, background: "#e2e8f0" }} onClick={() => setCount((value) => value - 1)}>
          -1
        </button>
        <button type="button" style={{ ...demoButtonStyle, background: "#cbd5e1" }} onClick={() => setCount(0)}>
          Reset
        </button>
        <button type="button" style={{ ...demoButtonStyle, background: "#bfdbfe" }} onClick={() => setCount((value) => value + 1)}>
          +1
        </button>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginTop: "0.75rem" }}>
        <button type="button" style={{ ...demoButtonStyle, background: "#fde68a" }} onClick={() => setCount((value) => value + 5)}>
          +5
        </button>
        <button type="button" style={{ ...demoButtonStyle, background: "#fca5a5" }} onClick={() => setCount((value) => value + 10)}>
          +10
        </button>
      </div>
    </div>
  );
}

const sections = [
  ["1. Basic Click", <BasicClickExample key="basic" />],
  ["2. Inline Handler", <InlineHandlerExample key="inline" />],
  ["3. Event Parameter", <EventParameterExample key="event" />],
  ["4. Handler with Arguments", <HandlerWithArgsExample key="args" />],
  ["5. Multiple Events", <MultipleEventsExample key="multiple" />],
  ["6. Prevent Default", <PreventDefaultExample key="prevent" />],
  ["7. Event Propagation", <EventPropagationExample key="propagation" />],
  ["8. Keyboard Events", <KeyboardEventsExample key="keyboard" />],
  ["9. Mouse Events", <MouseEventsExample key="mouse" />],
  ["10. Interactive Counter", <InteractiveCounter key="counter" />],
];

export default function EventHandlersDemo() {
  return (
    <section style={demoContainerStyle}>
      <header style={demoHeaderStyle}>
        <p style={demoMetaStyle}>Example 01</p>
        <h2 style={{ margin: 0 }}>Event Handlers</h2>
        <p style={demoTextStyle}>
          Exemplos curtos de clique, teclado, mouse, submit e propagacao de eventos.
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
