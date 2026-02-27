export default function Field({ label, error, ...props }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <input {...props} />
      {error ? (
        <span style={{ color: "crimson", fontSize: 12 }}>{error}</span>
      ) : null}
    </label>
  );
}