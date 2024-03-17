import Navbar from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/Protected";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import SearchSublet from "./components/SearchSublets";
import Description from "./components/Description";
// import CreateProfile from "./components/CreateProfile";
import Profile from "./pages/Profile";
import "./App.css";
import Post from "./components/Post";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/styles.scss";

export default function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/create-profile" element={<CreateProfile />} /> */}
        <Route path="/searchSubletss" element={<SearchSublet />} />
        <Route path="/desc" element={<Description />} />
        <Route path="/post" element={<Post />} />
        <Route
          path="/account"
          element={
            <Protected>
              <Account />
            </Protected>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}
