import React from "react";
import "./Spinner.css";

const Spinner = () => {
  // return (
  //   <div id="container">
  //     <div className="spinner">
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //     </div>
  //   </div>
  // );
   return (
     <div className="flex items-center justify-center min-h-screen   ">
       <div className="relative w-20 h-20 bg-[#0c0c0c] rounded-full grid place-content-center">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           height="24"
           viewBox="0 -960 960 960"
           width="24"
           fill="#fff"
           className="animate-spin-fast"
         >
           <path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" />
         </svg>
         <div className="absolute inset-0 border-[5px] border-[#0c0c0c] rounded-full shadow-[inset_0_0_0_7px_#fb9ec6,inset_0_0_0_10px_#0c0c0c,inset_0_0_0_12px_#fff]" />
         <div className="absolute inset-0 bg-[conic-gradient(#f93827,#f0a04b,#fb9ec6)] rounded-full -z-10 p-[3px] -right-[3px] -bottom-[3px] animate-spin-custom" />
         <div className="absolute inset-0 bg-[conic-gradient(#f93827,#f0a04b,#fb9ec6)] rounded-full -z-10 p-[3px] -right-[3px] -bottom-[3px] blur-lg animate-spin-custom" />
       </div>
       <style>
         {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-custom {
            animation: spin 5s linear infinite;
          }
          .animate-spin-fast {
            animation: spin 3s linear infinite;
          }
        `}
       </style>
     </div>
   );
};

export default Spinner;
