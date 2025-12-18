import { Link } from 'react-router';
import ArrowRightIcon from '../../icons/arrow-up-right.jsx';

export default function PathInfo({ currentPage }) {
  return (
    <div className="flex items-center text-sm text-gray-600 mb-6">
      <Link to="/" className="text-blue-600 hover:text-blue-800">
        HomePage
      </Link>
      <ArrowRightIcon width={16} height={16} className="mx-2" />
      <span className="text-gray-800">{currentPage}</span>
    </div>
  );
}
