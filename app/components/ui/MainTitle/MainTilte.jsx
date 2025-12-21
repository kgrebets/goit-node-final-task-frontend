export default function MainTitle({ children, className = '' }) {
  return (
    <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${className}`}>
      {children}
    </h1>
  );
}