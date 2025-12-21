export default function Loader({ size = 40, className = '' }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: 'currentColor transparent currentColor currentColor',
      }}
      role="status"
      aria-label="loading"
    />
  );
}
