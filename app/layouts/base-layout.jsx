import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/header';

const BaseLayout = () => {
  return (
    <>
      {/* Standard header position for all non-home pages */}
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default BaseLayout;
