import "./index.css";
import RegistrationForm from "./components/RegistrationForm";

export default function App() {
  return (
    <div className="page">
      <RegistrationForm />
      <footer className="muted" style={{ marginTop: 16 }}>
        Built with React + JS (Vite). Validation + reusable components.
      </footer>
    </div>
  );
}