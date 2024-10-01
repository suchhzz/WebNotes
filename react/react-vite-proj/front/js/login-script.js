
loginForm.addEventListener("submit", function() {
    event.preventDefault();

    const data = {
        username: document.getElementById("loginUsernameInput").value,
        password: document.getElementById("loginPasswordInput").value
    };
    
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://localhost:7051/login");
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