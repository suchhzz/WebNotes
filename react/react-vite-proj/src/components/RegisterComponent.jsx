import { useEffect, useRef } from "react";
import { registerUser } from "../services/userService";

export default function RegisterComponent({ onBackToLogin, onLogin }) {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    useEffect(() => {
        const myModal = new window.bootstrap.Modal(document.getElementById('staticBackdrop'));
        myModal.show();

    }, []);

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        if (password !== passwordConfirm) {
            console.log("passwords are different")
            return ;
        }

        registerUser(username, password, passwordConfirm);

        const newUser = registerUser(username, password, passwordConfirm);
    
        if (newUser) {
            onLogin(newUser);
        }
    }

    return (
        <div>
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Register</h5>
            </div>
            <div className="modal-body">
                <form id="registerForm" onSubmit={handleRegisterSubmit}>
                    <div className="form-container d-flex">
                        <input ref={usernameRef} id="usernameInput" type="text" placeholder="Username" />
                        <input ref={passwordRef} id="passwordInput" type="password" placeholder="Password" />
                        <input ref={passwordConfirmRef} id="passwordConfirmInput" type="password" placeholder="Confirm Password" />
                        <input type="submit" id="registerBtn" className="btn btn-outline-dark" value="Register" />
                    </div>
                    <hr />
                    <a href="#" onClick={onBackToLogin}>Log In</a>
                </form>
            </div>
        </div>
    )
}