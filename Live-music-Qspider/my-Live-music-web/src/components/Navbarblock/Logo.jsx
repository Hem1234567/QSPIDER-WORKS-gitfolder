import React from 'react'
import Mlogo from '../../assets/Mlogo.png'

const Logo = () => {
   return (
     <div className="h-20 basis-[20%] flex justify-center items-center">
       <img src={Mlogo} alt="" className="h-26 cursor-pointer" />
     </div>
   );

}

export default Logo