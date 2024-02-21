export default function Navbar() {
    return (
        <nav>
            <h2>Firebase Auth</h2>
  
            <form className="signup">
                <label htmlFor="email">email:</label> 
                <input type="email" name="email" /> 
                <label htmlFor="password">password:</label>
                <input type="password" name="password" />
                <button>signup</button>
            </form>

            <form className="login">
                <label htmlFor="email">email:</label>
                <input type="email" name="email" />
                <label htmlFor="password">password:</label>
                <input type="password" name="password" />
                <button>login</button>
            </form>
            
            <button className="logout">logout</button>
        </nav>
    );
}