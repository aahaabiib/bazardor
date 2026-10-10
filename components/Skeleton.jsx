export default function Skeleton({ n = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="card h-28 animate-pulse bg-gray-100" />
      ))}
    </div>
  );
}
