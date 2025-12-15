import { useAuth } from '../../../features/auth/AuthProvider.jsx';
import clsx from 'clsx';

export default function UserBar({ onOpenLogout, className }) {
  const { user } = useAuth();

  const displayName = user?.username || user?.email || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const handleClick = () => {
    onOpenLogout?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'flex items-center gap-2 focus:outline-none',
        'hover:opacity-90',
        className
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-sm font-medium text-gray-700">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>

      <span className="max-w-[140px] truncate text-sm text-gray-900">
        {displayName}
      </span>
    </button>
  );
}
