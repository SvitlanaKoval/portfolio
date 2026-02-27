import { useMemo, useState } from "react";
import Field from "./Field";
import { isEmail, isStrongPassword } from "../utils/validators";

const initial = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

export default function RegistrationForm() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const errors = useMemo(() => {
    const e = {};
    if (!values.firstName.trim()) e.firstName = "First name is required";
    if (!values.lastName.trim()) e.lastName = "Last name is required";

    if (!values.email.trim()) e.email = "Email is required";
    else if (!isEmail(values.email)) e.email = "Enter a valid email";

    if (!values.password) e.password = "Password is required";
    else if (!isStrongPassword(values.password))
      e.password = "Min 8 chars, include letters + numbers";

    if (!values.confirmPassword) e.confirmPassword = "Confirm your password";
    else if (values.confirmPassword !== values.password)
      e.confirmPassword = "Passwords do not match";

    if (!values.agree) e.agree = "You must accept the terms";

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  function update(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function onBlur(name) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agree: true,
    });

    if (!isValid) {
      setStatus({ type: "error", message: "Please fix the errors above." });
      return;
    }

    setStatus({ type: "loading", message: "Creating account..." });

    // Demo “API”
    await new Promise((r) => setTimeout(r, 700));

    setStatus({ type: "success", message: "Account created (demo) ✅" });
    setValues(initial);
    setTouched({});
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h2 style={{ marginTop: 0 }}>Account Registration</h2>
      <p className="muted">
        Demo project: client-side validation, clean UI, predictable state.
      </p>

      <div className="grid2">
        <Field
          label="First name"
          value={values.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          onBlur={() => onBlur("firstName")}
          error={touched.firstName ? errors.firstName : ""}
          placeholder="Svitlana"
        />
        <Field
          label="Last name"
          value={values.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          onBlur={() => onBlur("lastName")}
          error={touched.lastName ? errors.lastName : ""}
          placeholder="Koval"
        />
      </div>

      <Field
        label="Email"
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        onBlur={() => onBlur("email")}
        error={touched.email ? errors.email : ""}
        placeholder="name@email.com"
        inputMode="email"
      />

      <div className="grid2">
        <Field
          label="Password"
          type="password"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          onBlur={() => onBlur("password")}
          error={touched.password ? errors.password : ""}
          placeholder="********"
        />
        <Field
          label="Confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
          onBlur={() => onBlur("confirmPassword")}
          error={touched.confirmPassword ? errors.confirmPassword : ""}
          placeholder="********"
        />
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={values.agree}
          onChange={(e) => update("agree", e.target.checked)}
          onBlur={() => onBlur("agree")}
        />
        <span>I agree to the Terms</span>
      </label>
      {touched.agree && errors.agree ? (
        <div style={{ color: "crimson", fontSize: 12 }}>{errors.agree}</div>
      ) : null}

      <button type="submit" disabled={status.type === "loading"}>
        {status.type === "loading" ? "Creating..." : "Create account"}
      </button>

      {status.type !== "idle" ? (
        <div
          className={`status ${status.type}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}