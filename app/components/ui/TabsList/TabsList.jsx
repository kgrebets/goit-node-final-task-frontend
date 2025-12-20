
const TABS = [
  { id: 'recipes', label: 'Recipes' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'followers', label: 'Followers' },
  { id: 'following', label: 'Following' },
];

export default function TabsList({ activeTab = 'recipes', onTabChange }) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
