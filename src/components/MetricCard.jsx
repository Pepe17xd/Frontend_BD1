export function MetricCard({ label, value, icon: Icon }) {
  return (
    <article className="metric-card">
      {Icon && <Icon size={22} />}
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}
