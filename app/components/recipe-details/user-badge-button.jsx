import { Link } from 'react-router';
import { useAuth } from '../../features/auth/AuthProvider.jsx';
import getAvatarImageUrl from '../../helpers/getAvatarImageUrl';

export default function UserBadgeButton({
  userId,
  username,
  avatar,
  label = 'Created by:',
}) {
  const { isLoggedIn, openSignIn } = useAuth();
  if (!username || !userId) return null;

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      return openSignIn();
    }
  };

  return (
    <Link
      to={`/user/${userId}`}
      onClick={handleClick}
      className="relative z-10 pointer-events-auto flex items-center gap-3 text-left hover:opacity-80
             !border-0 !bg-transparent !p-0 !rounded-none normal-case"
    >
      <div className="flex items-center justify-center overflow-hidden rounded-full border border-tertiary bg-white w-10 h-10">
        {avatar ? (
          <img
            src={getAvatarImageUrl(avatar)}
            alt={username}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="font-bold text-tertiary rounded-full border border-tertiary bg-white text-avatar-sm w-10 h-10 flex items-center justify-center">
            {username.charAt(0)}
          </span>
        )}
      </div>

      <div className="leading-tight">
        {label && (
          <p className="text-sm md:text-base text-tertiary normal-case font-normal">
            {label}
          </p>
        )}
        <p className="text-sm md:text-base leading-5 font-bold text-tertiary md:text-primary normal-case">
          {username}
        </p>
      </div>
    </Link>
  );
}
