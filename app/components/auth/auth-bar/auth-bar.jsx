import { useHeaderTheme } from '../../../features/header-theme.jsx';

export default function AuthBar({ onOpenSignIn, onOpenSignUp }) {
  const handleSignIn = () => {
    if (onOpenSignIn) onOpenSignIn();
  };

  const handleSignUp = () => {
    if (onOpenSignUp) onOpenSignUp();
  };

  const { theme } = useHeaderTheme();
  const isDark = theme === 'dark';

  // Light-style background always; outline color opposite to header theme
  const wrapperClasses = isDark
    ? 'inline-flex items-center gap-0.5 rounded-full border border-white bg-white px-0.5 py-0.5'
    : 'inline-flex items-center gap-0.5 rounded-full border border-black bg-white px-0.5 py-0.5';

  const baseButtonClasses =
    'inline-flex items-center justify-center rounded-full border-0 px-4 py-2 text-[12px] leading-[18px] font-bold tracking-[-0.02em] uppercase transition-colors';

  // Selected vs not-selected:
  // - Sign up: black pill with white text that fades on hover
  // - Sign in: transparent, black text that fades on hover
  const primaryClasses = '!bg-black !text-white hover:!text-gray-300';
  const secondaryClasses = 'bg-transparent text-slate-900 hover:text-gray-500';

  return (
    <div className={wrapperClasses}>
      <button
        type="button"
        onClick={handleSignIn}
        className={`${baseButtonClasses} ${secondaryClasses}`}
      >
        Sign in
      </button>
      <button
        type="button"
        onClick={handleSignUp}
        className={`${baseButtonClasses} ${primaryClasses}`}
      >
        Sign up
      </button>
    </div>
  );
}
