import { Link } from 'react-router';
import ArrowUpRightIcon from '../../icons/arrow-up-right.jsx';

export default function UserCard({
  user,
  showFollowButton = true,
  onFollow,
  isFollowLoading = false,
}) {
  const handleClick = () => {
    if (onFollow && user?.id) {
      onFollow(user.id, user.isFollowing);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <img
            src={user?.avatar || '/default-avatar.png'}
            alt={user?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">{user?.name}</h3>
            <p className="text-gray-600 text-sm">
              {user?.recipesCount || 0} recipes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showFollowButton && (
            <button
              onClick={handleClick}
              disabled={isFollowLoading}
              className={`px-4 py-2 rounded text-sm font-medium ${
                user?.isFollowing
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } disabled:opacity-50`}
            >
              {isFollowLoading
                ? '...'
                : user?.isFollowing
                  ? 'Unfollow'
                  : 'Follow'}
            </button>
          )}

          <Link
            to={`/user/${user?.id}`}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowUpRightIcon width={18} height={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
