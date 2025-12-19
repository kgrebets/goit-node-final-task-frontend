import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAuth } from '../../features/auth/AuthProvider.jsx';

import {
  RecipeDetailsContainer,
  PopularRecipesContainer,
} from '../../features/recipe-details';

import SignInModal from '../../components/auth/signin-modal/index.js';
import SignUpModal from '../../components/auth/signup-modal/index.js';
import Loader from '../../components/ui/loader.jsx';
import ErrorMessage from '../../components/ui/error-message.jsx';

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
      if (isAuthenticated) return true;
      event?.preventDefault?.();
      openSignIn();
      return false;
    },
    [isAuthenticated, openSignIn]
  );

  const recipeLoading = useSelector((s) => s.recipeDetails.isLoading);
  const popularLoading = useSelector((s) => s.popularRecipes.isLoading);
  const isLoading = recipeLoading || popularLoading;

  const recipeError = useSelector((s) => s.recipeDetails.error);
  const popularError = useSelector((s) => s.popularRecipes.error);
  const error = recipeError || popularError;

  return (
    <>
      {isLoading ? (
        <div className="mx-auto w-full max-w-screen-sm px-4 py-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader size={72} className="text-primary" />
          </div>
        </div>
      ) : error ? (
        <ErrorMessage />
      ) : (
        <>
          <RecipeDetailsContainer requireAuth={requireAuth} />
          <PopularRecipesContainer requireAuth={requireAuth} />
        </>
      )}

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
