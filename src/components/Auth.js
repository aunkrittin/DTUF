import React, { useState, useEffect } from "react";
import firebaseConfig from "../config";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      // <div className="container-auth">
      //   <p>Loading...</p>
      // </div>
      <div className="container-auth">
        <div className="loader">
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
