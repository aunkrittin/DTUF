import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="container mt-5">
        <h1>Welcome</h1>
        <p>This is the dashboard, if you can see this you're logged in.</p>
        <button
          onClick={() => firebaseConfig.auth().signOut()}
          className="btn btn-danger"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
