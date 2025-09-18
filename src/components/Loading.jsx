
export default function Loading({ message = "Loading..." }) {
  return (
    <div className="text-center py-4">
      <p className="text-gray-500 animate-pulse">{message}</p>
    </div>
  );
}
