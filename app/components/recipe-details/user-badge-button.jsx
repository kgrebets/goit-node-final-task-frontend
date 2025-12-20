import { useNavigate } from 'react-router';
import getAvatarImageUrl from '../../helpers/getAvatarImageUrl';

export default function UserBadgeButton({
  userId,
  username,
  avatar,
  label = 'Created by:',
  size = 'md',
  requireAuth,
}) {
  const navigate = useNavigate();

  if (!username) return null;

  const sizeMap = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const handleClick = (e) => {
    if (requireAuth && requireAuth(e) === false) return;
    if (userId) navigate(`/users/${userId}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative z-10 pointer-events-auto flex items-center gap-3 text-left hover:opacity-80
             !border-0 !bg-transparent !p-0 !rounded-none normal-case"
    >
      <div
        className={`flex items-center justify-center overflow-hidden rounded-full border border-tertiary bg-white ${sizeMap[size]}`}
      >
        {avatar ? (
          <img
            src={getAvatarImageUrl(avatar)}
            alt={username}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="font-bold text-tertiary">{username.charAt(0)}</span>
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
    </button>
  );
}
