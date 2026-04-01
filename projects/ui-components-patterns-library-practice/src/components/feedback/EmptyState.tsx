type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="card muted">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
