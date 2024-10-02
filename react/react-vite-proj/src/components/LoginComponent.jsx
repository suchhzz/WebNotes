import { useEffect, useRef, useState } from "react";
import { loginUser } from "../services/userService";
import RegisterComponent from "./RegisterComponent";

export default function LoginComponent({ onLogin }) {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const myModal = new window.bootstrap.Modal(document.getElementById('staticBackdrop'));
        myModal.show();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const newUser = await loginUser(username, password);
        
        if (newUser) {
            onLogin(newUser);
        }
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
    };

    const handleBackToLogin = () => {
        setShowRegister(false);
    };

    return (
        <div className="container">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    {!showRegister ? (
                        <div>
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{showRegister ? "Register" : "Log In"}</h5>
                        </div>
                        <div className="modal-body">
                                <form id="loginForm" onSubmit={handleSubmit}>
                                    <input ref={usernameRef} type="text" placeholder="Username" required />
                                    <input ref={passwordRef} type="password" placeholder="Password" required />
                                    <input type="submit" className="btn btn-outline-dark" value="Log In" />
                                    <hr />
                                    <a href="#" onClick={handleRegisterClick}>Register</a>
                                </form>
                        </div>
                        </div>
                        
                    ) : (
                        <RegisterComponent onBackToLogin={handleBackToLogin} />
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}
