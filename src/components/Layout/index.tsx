import { Outlet } from 'react-router-dom';
import { FloatingMenu } from '../floartingMenu';

export function Layout() {
  return (
    <>
      <Outlet />
      <FloatingMenu />
    </>
  );
}
