import TabButton from './tab-button';

export default function Tab({ label, value, isActive, onClick }) {
  return (
    <li className="relative">
      <TabButton label={label} isActive={isActive} onClick={onClick} />
      {isActive && (
        <div className="absolute bottom--.5 left-0 right-0 h-0.75 bg-[#050505]" />
      )}
    </li>
  );
}
