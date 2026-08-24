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

function BasicInputExample() {
  const [name, setName] = useState("");

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
        style={demoInputStyle}
      />
      <p style={demoTextStyle}>Hello, {name || "stranger"}.</p>
    </>
  );
}

function MultipleInputsExample() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
  });

  const updateField = (name, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const updateAddress = (name, value) => {
    setFormData((currentData) => ({
      ...currentData,
      address: {
        ...currentData.address,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <input
        type="text"
        value={formData.firstName}
        onChange={(event) => updateField("firstName", event.target.value)}
        placeholder="First name"
        style={demoInputStyle}
      />
      <input
        type="text"
        value={formData.lastName}
        onChange={(event) => updateField("lastName", event.target.value)}
        placeholder="Last name"
        style={demoInputStyle}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(event) => updateField("email", event.target.value)}
        placeholder="Email"
        style={demoInputStyle}
      />
      <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <input
          type="text"
          value={formData.address.street}
          onChange={(event) => updateAddress("street", event.target.value)}
          placeholder="Street"
          style={demoInputStyle}
        />
        <input
          type="text"
          value={formData.address.city}
          onChange={(event) => updateAddress("city", event.target.value)}
          placeholder="City"
          style={demoInputStyle}
        />
      </div>
      <p style={demoTextStyle}>
        {formData.firstName} {formData.lastName} - {formData.email || "No email"}
      </p>
    </>
  );
}

function TextareaExample() {
  const [message, setMessage] = useState("");

  return (
    <>
      <textarea
        rows="4"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Write your message..."
        style={{ ...demoInputStyle, resize: "vertical" }}
      />
      <p style={demoTextStyle}>Character count: {message.length}</p>
    </>
  );
}

function SelectExample() {
  const [country, setCountry] = useState("");

  return (
    <>
      <select
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        style={demoInputStyle}
      >
        <option value="">Select a country</option>
        <option value="usa">United States</option>
        <option value="canada">Canada</option>
        <option value="uk">United Kingdom</option>
      </select>
      <p style={demoTextStyle}>Selected: {country || "None"}</p>
    </>
  );
}

function CheckboxExample() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => setIsChecked(event.target.checked)}
        />{" "}
        I agree to the terms
      </label>
      <p style={demoTextStyle}>Status: {isChecked ? "Agreed" : "Not agreed"}</p>
    </>
  );
}

function MultipleCheckboxesExample() {
  const hobbies = ["Reading", "Gaming", "Cooking", "Traveling"];
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const toggleHobby = (hobby) => {
    setSelectedHobbies((currentHobbies) =>
      currentHobbies.includes(hobby)
        ? currentHobbies.filter((item) => item !== hobby)
        : [...currentHobbies, hobby],
    );
  };

  return (
    <>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        {hobbies.map((hobby) => (
          <label key={hobby}>
            <input
              type="checkbox"
              checked={selectedHobbies.includes(hobby)}
              onChange={() => toggleHobby(hobby)}
            />{" "}
            {hobby}
          </label>
        ))}
      </div>
      <p style={demoTextStyle}>
        Selected: {selectedHobbies.join(", ") || "None"}
      </p>
    </>
  );
}

function RadioButtonExample() {
  const [selectedGender, setSelectedGender] = useState("");

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {["male", "female", "other"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="gender"
              value={option}
              checked={selectedGender === option}
              onChange={(event) => setSelectedGender(event.target.value)}
            />{" "}
            {option}
          </label>
        ))}
      </div>
      <p style={demoTextStyle}>Selected: {selectedGender || "None"}</p>
    </>
  );
}

function FormSubmissionExample() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (name, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 1500);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <input
          type="text"
          value={formData.username}
          onChange={(event) => updateField("username", event.target.value)}
          placeholder="Username"
          style={demoInputStyle}
        />
        <input
          type="password"
          value={formData.password}
          onChange={(event) => updateField("password", event.target.value)}
          placeholder="Password"
          style={demoInputStyle}
        />
        <button
          type="submit"
          style={{ ...demoButtonStyle, background: "#2563eb", color: "#fff" }}
        >
          Submit
        </button>
      </form>
      {submitted && <p style={demoTextStyle}>Form submitted successfully.</p>}
    </>
  );
}

function FormValidationExample() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    window.alert("Email is valid!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <input
        type="text"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setError("");
        }}
        placeholder="Enter email"
        style={demoInputStyle}
      />
      <button
        type="submit"
        style={{ ...demoButtonStyle, background: "#0f172a", color: "#fff" }}
      >
        Validate
      </button>
      {error && <p style={{ ...demoTextStyle, color: "#b91c1c" }}>{error}</p>}
    </form>
  );
}

function RegistrationFormExample() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.username.trim()) nextErrors.username = "Username is required";
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    if (!formData.password) nextErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }
    if (formData.age && Number(formData.age) < 18) {
      nextErrors.age = "Must be 18 or older";
    }
    if (!formData.termsAccepted) {
      nextErrors.termsAccepted = "You must accept terms";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return <p style={demoTextStyle}>Registration successful. Welcome, {formData.username}.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        style={demoInputStyle}
      />
      {errors.username && <p style={{ ...demoTextStyle, color: "#b91c1c" }}>{errors.username}</p>}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        style={demoInputStyle}
      />
      {errors.email && <p style={{ ...demoTextStyle, color: "#b91c1c" }}>{errors.email}</p>}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        style={demoInputStyle}
      />
      {errors.password && <p style={{ ...demoTextStyle, color: "#b91c1c" }}>{errors.password}</p>}
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
        style={demoInputStyle}
      />
      {errors.confirmPassword && <p style={{ ...demoTextStyle, color: "#b91c1c" }}>{errors.confirmPassword}</p>}
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        style={demoInputStyle}
      />
      {errors.age && <p style={{ ...demoTextStyle, color: "#b91c1c" }}>{errors.age}</p>}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {["male", "female"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="gender"
              value={option}
              checked={formData.gender === option}
              onChange={handleChange}
            />{" "}
            {option}
          </label>
        ))}
      </div>
      <label>
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        />{" "}
        I accept the terms
      </label>
      {errors.termsAccepted && <p style={{ ...demoTextStyle, color: "#b91c1c" }}>{errors.termsAccepted}</p>}
      <button
        type="submit"
        style={{ ...demoButtonStyle, background: "#2563eb", color: "#fff" }}
      >
        Register
      </button>
    </form>
  );
}

const sections = [
  ["1. Basic Controlled Input", <BasicInputExample key="basic" />],
  ["2. Multiple Inputs", <MultipleInputsExample key="multiple" />],
  ["3. Textarea", <TextareaExample key="textarea" />],
  ["4. Select", <SelectExample key="select" />],
  ["5. Checkbox", <CheckboxExample key="checkbox" />],
  ["6. Multiple Checkboxes", <MultipleCheckboxesExample key="checkboxes" />],
  ["7. Radio Buttons", <RadioButtonExample key="radio" />],
  ["8. Form Submission", <FormSubmissionExample key="submit" />],
  ["9. Form Validation", <FormValidationExample key="validation" />],
  ["10. Registration Form", <RegistrationFormExample key="registration" />],
];

export default function FormsControlledDemo() {
  return (
    <section style={demoContainerStyle}>
      <header style={demoHeaderStyle}>
        <p style={demoMetaStyle}>Example 04</p>
        <h2 style={{ margin: 0 }}>Forms and Controlled Components</h2>
        <p style={demoTextStyle}>
          Campos controlados, validacao, submit e formularios com estado composto.
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
