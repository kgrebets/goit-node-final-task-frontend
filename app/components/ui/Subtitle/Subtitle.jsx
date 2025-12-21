export default function Subtitle({ children, className = '' }) {
  return (
    <h2 className={`text-lg md:text-xl text-gray-600 mb-8 ${className}`}>
      {children}
    </h2>
  );
}