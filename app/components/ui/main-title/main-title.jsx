export default function MainTitle({ children, className = '' }) {
  return (

      <h1 className={`text-3xl font-bold tracking-tight text-primary uppercase ${className}`}>
        {children}
      </h1>

  );
}