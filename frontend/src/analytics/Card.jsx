export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-sm font-semibold text-gray-500 mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}