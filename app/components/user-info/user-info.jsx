import Icon from "../Icon";

export default function UserInfo({ user }) {
  const displayName = user?.name || user?.email || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const handleAddClick = () => {
    console.log('Add button clicked');
  };

  return (
    <div className="flex flex-col items-center rounded-[30px] border border-tertiary px-[80px] py-[40px]">
      <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-2xl font-bold text-gray-700">
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

      <button
        type="button"
        onClick={handleAddClick}
        className="p-0 font-normal relative top-[-24px] flex h-[38px] w-[38px] items-center justify-center rounded-full bg-black text-xl leading-none text-white hover:bg-black/80"
      >
        <Icon name="plus" size={20} />
      </button>

      <div className="mt-6 flex flex-col gap-2 text-left text-secondary text-sm">
        <p>
          <span className="mr-2 text-tertiary">Email:</span>{user?.email || '-'}
        </p>
        <p>
          <span className="mr-2 text-tertiary">Added recipes:</span>{user?.recipesCount ?? 0}
        </p>
        <p>
          <span className="mr-2 text-tertiary">Favorites:</span>{user?.favoritesCount ?? 0}
        </p>
        <p>
          <span className="mr-2 text-tertiary">Followers:</span>{user?.followersCount ?? 0}
        </p>
        <p>
          <span className="mr-2 text-tertiary">Following:</span>{user?.followingCount ?? 0}
        </p>
      </div>
    </div>
  );
}

