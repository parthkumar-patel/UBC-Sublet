import { useEffect } from 'react';
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import {
	createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile, 
	getAuth
} from "firebase/auth"

const auth = getAuth();

// Function to handle signup form submission
const handleSignupSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target.elements.displayName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (cred) => {
            try {
                await updateProfile(cred.user, { displayName: displayName });
                console.log('User created:', cred.user);
                e.target.reset();
            } catch (err) {
                console.error('Error updating profile:', err.message);
            }
        })
        .catch((err) => {
            console.error('Error:', err.message);
        });
};

// Function to handle login form submission
const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('User logged in:', cred.user);
            e.target.reset();
        })
        .catch((err) => {
            console.error('Error:', err.message);
        });
};


export default function SignIn() {
	const { user, googleSignIn } = UserAuth();
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user != null) {
			navigate('/account');
		}
	}, [navigate, user]);

	return (
		<div>
			<h1 className='text-center display-4 font-weight-bold py-5'>Sign in</h1>
			<div>
				<form className="signup" onSubmit={handleSignupSubmit}>
					<label htmlFor="displayName">Name:</label>
					<input type="text" id="name" name="displayName" />
					<label htmlFor="signup-email">Email:</label>
					<input type="email" id="signup-email" name="email" />
					<label htmlFor="signup-password">Password:</label>
					<input type="password" id="signup-password" name="password" />
					<button type="submit">Signup</button>
				</form>

				<form className="login" onSubmit={handleLoginSubmit}>
					<label htmlFor="login-email">Email:</label>
					<input type="email" id="login-email" name="email" />
					<label htmlFor="login-password">Password:</label>
					<input type="password" id="login-password" name="password" />
					<button type="submit">Login</button>
				</form>
			</div>

			<div className='max-w-240px mx-auto py-4'>
				<GoogleButton onClick={handleGoogleSignIn} />
			</div>
		</div>
	);
}