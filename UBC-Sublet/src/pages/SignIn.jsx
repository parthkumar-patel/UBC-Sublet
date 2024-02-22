import { useEffect } from 'react';
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { 
	handleSignupSubmit, 
	handleLoginSubmit 
} from '../context/AuthContext';

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
	}, [user]);

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