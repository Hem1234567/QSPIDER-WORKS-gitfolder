import React from 'react'
import Navbarcontainer from './components/Navbarblock/Navbarcontainer'
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div>
      <Toaster/>
      <Navbarcontainer />
      <Outlet/>
    </div>
  );
}

export default Layout