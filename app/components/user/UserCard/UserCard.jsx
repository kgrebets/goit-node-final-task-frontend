// import { Link } from 'react-router';
// import { useFollow } from '../../../features/users/useFollow.js';
// import ArrowUpRightIcon from '../../icons/arrow-up-right.jsx';

// export default function UserCard({ user, showFollowButton = true }) {
//   const followMutation = useFollow();
  
//   const handleFollow = () => {
//     followMutation.mutate({ 
//       userId: user.id, 
//       action: user.isFollowing ? 'unfollow' : 'follow' 
//     });
//   };
  
//   return (
//     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start">
//         <div className="flex gap-4">
//           <div className="shrink-0">
//             <img 
//               src={user.avatar || '/default-avatar.png'} 
//               alt={user.name}
//               className="w-16 h-16 rounded-full object-cover"
//             />
//           </div>
          
//           <div>
//             <h3 className="font-bold text-lg">{user.name}</h3>
//             <p className="text-gray-600 text-sm">
//               {user.recipesCount || 0} recipes
//             </p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           {showFollowButton && (
//             <button
//               onClick={handleFollow}
//               disabled={followMutation.isPending}
//               className={`px-4 py-2 rounded text-sm font-medium ${
//                 user.isFollowing 
//                   ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//               } disabled:opacity-50`}
//             >
//               {followMutation.isPending 
//                 ? '...' 
//                 : user.isFollowing ? 'Unfollow' : 'Follow'
//               }
//             </button>
//           )}
          
//           <Link 
//             to={`/user/${user.id}`}
//             className="text-gray-500 hover:text-gray-700 p-1"
//             aria-label="View user profile"
//           >
//             <ArrowUpRightIcon width={18} height={18} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from 'react-router';
import ArrowUpRightIcon from '../../icons/arrow-up-right.jsx';

export default function UserCard({ 
  user, 
  showFollowButton = true, 
  onFollow,
  isFollowLoading = false 
}) {
  console.log('USER CARD DEBUG - user:', user?.id, 'showButton:', showFollowButton);
  
  const handleClick = (e) => {
    e.stopPropagation();
    console.log('CLICK WORKING! User ID:', user?.id);
    if (onFollow) {
      onFollow(user?.id, user?.isFollowing);
    }
  };
  
  return (
    <div 
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="shrink-0">
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          
          <div>
            <h3 className="font-bold text-lg">{user?.name}</h3>
            <p className="text-gray-600 text-sm">
              {user?.recipesCount || 0} recipes
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3" style={{ zIndex: 1000 }}>
          {showFollowButton && (
            <button
              onClick={handleClick}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              disabled={isFollowLoading}
              className="px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 relative z-50"
              style={{ 
                position: 'relative', 
                zIndex: 1001,
                pointerEvents: 'auto'
              }}
            >
              TEST BUTTON
            </button>
          )}
          
          <Link 
            to={`/user/${user?.id}`}
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="View user profile"
          >
            <ArrowUpRightIcon width={18} height={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}