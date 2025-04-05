import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { __AUTH } from "../backend/Firebaseconfig.js";

export const AuthUserContext = createContext(null);

export const AuthContextApi = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(__AUTH, (userInfo) => {
      if (userInfo?.emailVerified) {
        window.localStorage.setItem("UserToken", userInfo.accessToken);
        setAuthUser(userInfo);
      } else {
        setAuthUser(null);
        window.localStorage.removeItem("UserToken");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthUserContext.Provider value={{ authUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthContextApi;
