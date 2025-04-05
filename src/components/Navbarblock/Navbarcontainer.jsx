import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const Navbarcontainer = () => {
  return (
    <header className="h-20 w-screen border border-[#0b0e38] bg-[#0b0e38] text-white flex  justify-between shadow-md">
      <Logo />
      <Menu />
    </header>
  );
}

export default Navbarcontainer