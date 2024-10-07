import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/userService";

export default function RegisterComponent() {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const navigate = useNavigate();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        if (password !== passwordConfirm) {
            console.log("Passwords are different");
            return;
        }

        const newUser = await register(username, password, passwordConfirm);

        if (newUser) {
            navigate("/");
        }
    };

    return (
        <div className="auth-page">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card" style={{ width: "400px" }}>
                    <div className="card-header">
                        <h5 className="card-title">Register</h5>
                    </div>
                    <div className="card-body">
                        <form id="registerForm" onSubmit={handleRegisterSubmit}>
                            <div className="form-group mb-3">
                                <input ref={usernameRef} id="usernameInput" type="text" placeholder="Username" className="form-control" required />
                            </div>
                            <div className="form-group mb-3">
                                <input ref={passwordRef} id="passwordInput" type="password" placeholder="Password" className="form-control" required />
                            </div>
                            <div className="form-group mb-3">
                                <input ref={passwordConfirmRef} id="passwordConfirmInput" type="password" placeholder="Confirm Password" className="form-control" required />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <input type="submit" id="registerBtn" className="btn btn-outline-dark" value="Register" />
                                <Link to="/login" className="btn btn-link">Log In</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
