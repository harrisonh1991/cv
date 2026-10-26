import { Outlet } from 'react-router-dom';

import NavHeader from '@/components/navHeader';

const LayoutMain = () => {
  return (
    <>
      <NavHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutMain;
