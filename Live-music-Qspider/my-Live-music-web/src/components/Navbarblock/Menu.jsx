import React from 'react'
import { NavLink } from 'react-router-dom';
import Home from '../../pages/Home';

const Menu = () => {
   return (
     <div className="flex justify-end mr-[100px] items-center basis-[25%] ">
       <ul className="flex gap-7 text-[16px]">
         <li>
           <NavLink
             to={"/"}
             className={({ isActive }) =>
               `${
                 isActive ? "bg-blue-800" : ""
               } border border-transparent px-3 py-2 font-semibold rounded-md hover:bg-blue-800 cursor-pointer `
             }
           >
             Home
           </NavLink>
         </li>
         <li>
           <NavLink
             to={"/auth/login"}
             className={({ isActive }) =>
               `${
                 isActive ? "bg-blue-800" : ""
               } border border-transparent px-3 py-2 font-semibold rounded-md hover:bg-blue-800 cursor-pointer `
             }
           >
             Login
           </NavLink>
         </li>
         <li>
           <NavLink
             to={"/auth/register"}
             className={({ isActive }) =>
               `${
                 isActive ? "bg-blue-800" : ""
               } border border-transparent px-3 py-2 font-semibold rounded-md hover:bg-blue-800 cursor-pointer `
             }
           >
             Register
           </NavLink>
         </li>
       </ul>
     </div>
   );

}

export default Menu


