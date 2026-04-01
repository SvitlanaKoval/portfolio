type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
};

export function TextField({ label, name, value, onChange, error, placeholder }: TextFieldProps) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        className={`input ${error ? 'input-error' : ''}`}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
