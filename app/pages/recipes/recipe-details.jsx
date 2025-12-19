import { useCallback, useState } from 'react';

import { useAuth } from '../../features/auth/AuthProvider.jsx';

import RecipeDetailsContainer from '../../features/recipes/recipe-details/RecipeDetailsContainer';
import PopularRecipes from '../../features/recipes/recipe-details/PopularRecipes';

import SignInModal from '../../components/auth/signin-modal';
import SignUpModal from '../../components/auth/signup-modal';

export default function RecipeDetailsPage() {
  const { user, token } = useAuth();
  const isAuthenticated = Boolean(user && token);

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const closeAllModals = useCallback(() => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  }, []);

  const openSignIn = useCallback(() => {
    closeAllModals();
    setIsSignInOpen(true);
  }, [closeAllModals]);

  const openSignUp = useCallback(() => {
    closeAllModals();
    setIsSignUpOpen(true);
  }, [closeAllModals]);

  const requireAuth = useCallback(
    (event) => {
      console.log('requireAuth called. isAuthenticated=', isAuthenticated);
      if (isAuthenticated) return true;
      event?.preventDefault?.();
      openSignIn();
      return false;
    },
    [isAuthenticated, openSignIn]
  );

  return (
    <>
      <RecipeDetailsContainer requireAuth={requireAuth} />
      <PopularRecipes requireAuth={requireAuth} />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
    </>
  );
}
