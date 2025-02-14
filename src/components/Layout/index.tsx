import { Outlet } from 'react-router-dom';
import { FloatingMenu } from '../floartingMenu';
import { Header } from '../header';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <FloatingMenu />
    </>
  );
}
