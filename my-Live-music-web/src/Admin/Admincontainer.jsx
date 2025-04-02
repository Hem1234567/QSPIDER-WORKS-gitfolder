import React from 'react'
import Adminsidebar from './Adminsidebar';
import Admincontent from './Admincontent';

const Admincontainer = () => {
  return (
    <div className="w-[100%] flex ">
      <Adminsidebar/>
      <Admincontent/>
    </div>
  );
}

export default Admincontainer