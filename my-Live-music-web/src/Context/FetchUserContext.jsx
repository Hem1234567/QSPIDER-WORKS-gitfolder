import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUserContext } from "./AuthContextApi";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../backend/Firebaseconfig";

export const backendUserContext = createContext(null);

const FetchUserContext = ({ children }) => {
  const { authUser } = useContext(AuthUserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!authUser?.uid) return; // Prevents errors if authUser is null

    const userDocRef = doc(__DB, "user_details", authUser.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data()); // Set Firestore user data
      } else {
        setUserData(null); // If no data, reset state
      }
    });

    return () => unsubscribe(); // Cleanup Firestore listener
  }, [authUser]);

  return (
    <backendUserContext.Provider value={{ userData }}>
      {children}
    </backendUserContext.Provider>
  );
};

export default FetchUserContext;
