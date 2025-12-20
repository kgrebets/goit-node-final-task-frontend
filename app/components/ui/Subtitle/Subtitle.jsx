export default function Subtitle({ children, className = '' }) {
  return (
      <p
        className={`text-secondary font-medium text-base leading-normal tracking-tight ${className}`}
      >
        {children}
      </p>
  );
}
