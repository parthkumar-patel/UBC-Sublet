import { Link } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

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
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">Firebase Google Auth & Context</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        {user ? (
                            <li className="nav-item">
                                <button onClick={handleSignOut} className="btn btn-outline-light">Logout</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/signin" className="btn btn-outline-light">Sign in</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
