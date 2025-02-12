import React from "react";

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register; // ✅ Ensure default export is added
