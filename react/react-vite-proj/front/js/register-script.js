document.addEventListener("DOMContentLoaded", function() {
    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    myModal.show();
});

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function() {
    event.preventDefault();

    const data = {
        username: document.getElementById("usernameInput").value,
        password: document.getElementById("passwordInput").value,
        passwordConfirm: document.getElementById("passwordConfirmInput").value
    };

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://localhost:7051/register");

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.response);
            console.log(response);
        }
        else {
            console.log("some error");
            console.log(xhr.statusText);
            console.log(data);
        }
    }

    xhr.send(JSON.stringify(data));
});
