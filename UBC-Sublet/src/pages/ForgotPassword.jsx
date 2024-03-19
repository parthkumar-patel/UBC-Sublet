// import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Success from "../components/Success";
import Error from "../components/Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const auth = getAuth();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.login_email.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        e.target.reset();
        setSuccess(true); // Set success only when email is sent successfully
        setUserNotFound(false); // Reset userNotFound in case it was previously set
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setUserNotFound(true); // Set userNotFound if email address is not found
          setSuccess(false); // Reset success in case it was previously set
        } else {
          // Handle other errors
          console.error("Error sending password reset email:", error);
        }
      });
  };

  const navigate = useNavigate();
  function handleNavigateToSignup() {
    return navigate("/signup");
  }

  return (
    <div>
      {userNotFound ? (
        <Error msg="Email address not found. Create an account." />
      ) : (
        <></>
      )}
      {success ? (
        <>
          <Success msg="Password reset email sent to your email address!" />
          {/* <>setInterval({setSuccess(false)}, 3000);</> */}
        </>
      ) : (
        <></>
      )}
      <div className="forgot-password-form-container">
        <p className="title">Forgot Password?</p>
        <form className="form" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            id="login_email"
            name="login_email"
            className="input"
            placeholder="Email"
          />
          <button type="submit" className="form-btn">
            Reset Password
          </button>
        </form>
        <div onClick={handleNavigateToSignup}>
          <p className="sign-up-label">
            Don&apos;t have an account?
            <span className="sign-up-link">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
