import clsx from 'clsx';

export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'pb-4 text-sm md:text-base font-bold uppercase tracking-tight transition-colors hover:bg-transparent p-0 border-0',
        isActive ? 'text-[#050505]' : 'text-[#BFBEBE] hover:text-[#050505]'
      )}
    >
      {label}
    </button>
  );
}
