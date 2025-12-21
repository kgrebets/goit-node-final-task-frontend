import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import Header from '../components/header';
import mainBannerImage from '../assets/home/main-banner-image.png';
import Testimonials from '../components/home/testimonials';
import { useAuth } from '../features/auth/AuthProvider';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, openSignIn } = useAuth();

  const handleAddRecipeClick = () => {
    if (!isLoggedIn) {
      openSignIn();
      return;
    }

    navigate('/recipe/add');
  };
  return (
    <>
      <div className="bg-primary rounded-7.5 m-2 md:m-4 lg:m-5 mb-16 md:mb-24 lg:mb-32">
        <Header classNames="bg-primary rounded-t-7.5" dark={true} />

        <div className="mt-36 pb-24 lg:mt-21 lg:pb-21 flex flex-col gap-5 md:gap-10 md:px-0 items-center px-4 mx-auto md:max-w-2xl lg:max-w-4xl">
          <h1 className="text-white text-4.25xl md:text-6.75xl lg:text-7.75xl font-extrabold text-center tracking-tight">
            Improve Your Culinary Talents
          </h1>
          <p className="text-white text-sm md:text-base md:px-10 lg:px-40 font-medium text-center tracking-tight">
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>

          <button
            className="text-white hover:bg-white hover:text-primary"
            onClick={handleAddRecipeClick}
          >
            Add Recipe
          </button>

          <img src={mainBannerImage} alt="Main banner" className="pt-2.5" />
        </div>
      </div>
      <main className="main">
        <Outlet />
        <Testimonials />
      </main>
    </>
  );
};

export default DefaultLayout;
