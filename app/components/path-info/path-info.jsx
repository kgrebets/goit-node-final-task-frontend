import { Link } from 'react-router-dom';

export default function PathInfo({ current }) {
  if (!current) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm uppercase tracking-wide">
      <Link to="/" className="text-gray-400 hover:text-gray-600">
        Home
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <span aria-current="page" className="font-semibold text-gray-900">
        {current}
      </span>
    </nav>
  );
}
