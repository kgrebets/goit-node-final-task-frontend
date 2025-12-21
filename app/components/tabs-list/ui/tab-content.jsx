const TabContent = ({
  isLoading,
  error,
  items,
  renderItem,
  emptyMessage = 'No items yet',
  loadingMessage = 'Loading...',
}) => {
  if (isLoading) {
    return (
      <ul>
        <li className="py-8 text-center text-tertiary">{loadingMessage}</li>
      </ul>
    );
  }

  if (error) {
    return (
      <ul>
        <li className="py-8 text-center text-red-500">Error: {error}</li>
      </ul>
    );
  }

  if (!isLoading && !error && items.length === 0) {
    return (
      <ul>
        <li className="py-8 text-center text-tertiary">{emptyMessage}</li>
      </ul>
    );
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default TabContent;
