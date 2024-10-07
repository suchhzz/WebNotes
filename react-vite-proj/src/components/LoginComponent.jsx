import { useEffect, useRef } from "react";
import { login } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";

export default function LoginComponent() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("login component");
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const newUser = await login(username, password);

        if (newUser) {
            navigate("/");
        }
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div className="auth-page">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card" style={{ width: "400px" }}>
                    <div className="card-header">
                        <h5 className="card-title">Log In</h5>
                    </div>
                    <div className="card-body">
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <input ref={usernameRef} type="text" placeholder="Username" className="form-control" required />
                            </div>
                            <div className="form-group mb-3">
                                <input ref={passwordRef} type="password" placeholder="Password" className="form-control" required />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <input type="submit" className="btn btn-outline-dark" value="Log In" />
                                <button type="button" className="btn btn-link" onClick={handleRegisterClick}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
