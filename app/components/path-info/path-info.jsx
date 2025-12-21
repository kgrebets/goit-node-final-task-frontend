import { Link } from 'react-router-dom';

export default function PathInfo({ current }) {
  if (!current) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm uppercase tracking-wide">
      <Link
        to="/"
        className="text-tertiary hover:text-primary transition-colors"
      >
        Home
      </Link>

      <span className="mx-2 text-tertiary">/</span>

      <span aria-current="page" className="font-semibold text-secondary">
        {current}
      </span>
    </nav>
  );
}
