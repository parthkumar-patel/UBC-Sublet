import { Link } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
        try {
          await logOut()
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <div className="d-flex justify-content-between bg-secondary w-100 p-4">
            <h1 className="text-center text-2xl font-weight-bold text-white">
                Firebase Google Auth & Context
            </h1>
            {user?.displayName ? (
                <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>Logout</button>
            ) : (
                <Link to='/signin'>Sign in</Link>
            )}
        </div>
    );
}