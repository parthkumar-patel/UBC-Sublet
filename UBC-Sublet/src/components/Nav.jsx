import { Link } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import Logo from "../assets/logo.png"
import Profile from "../assets/profile.png"
import Fav from "../assets/fav.svg"
import Search from "../assets/search.svg"

export default function Navbar() {
    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-primary bg-body-secondary fixed-top">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link to="/" className="navbar-brand">
                    <img src={Logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
                    UBC Sublet
                </Link>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <form className="d-flex ms-auto">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                            style={{ backgroundImage: `url(${Search})`, backgroundPosition: '10px center', backgroundRepeat: 'no-repeat', paddingLeft: '40px' }} />
                    </form>
                    <Link to="/Fav" className="navbar">
                        <img src={Fav} alt="Fav" width="30" height="24" className="d-inline-block align-text-top ms-2" />
                    </Link>
                </div>

                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={Profile} alt="Profile" width="30" height="24" className="d-inline-block align-text-top ms-2" />  
                    </a>
                    <ul className="dropdown-menu">
                        <Link to="/profile" className="dropdown-item ms-3">Profile</Link>
                        <hr className="dropdown-divider" />
                        <div className="dropdown-item ms-1">
                            {user ? (
                                <a onClick={handleSignOut} className="btn">Logout</a>
                            ) : (
                                <Link to="/signin" className="btn">Sign in</Link>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
