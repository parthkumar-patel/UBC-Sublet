import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
// import Profile from "../assets/profile.png";

export default function PersonalProfile() {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="d-flex">
      <img src={user.photoURL} alt="Profile" />
      <p>First Name: {user.displayName}</p>
    </div>
  );
}
