export const getUser = function() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "https://localhost:7051/users");

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.response);
                resolve(response);
            } else {
                reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network error"));
        };

        xhr.send();
    });
};

export const loginUser = function(username, password) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://localhost:7051/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;

    let userData = {
        username: username,
        password: password
    };

    xhr.onload = function() {
        if (xhr.status === 200) {

            console.log("logged in");
        } else {
            reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
        }
    };

    xhr.onerror = function() {
        reject(new Error("Network error"));
    };

    xhr.send(JSON.stringify(userData));
}

export const registerUser = function(username, password, passwordConfirm) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://localhost:7051/register");
    
    xhr.setRequestHeader("Content-Type", "application/json");

    let userData = {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm
    };

    xhr.onload = function() {
        if (xhr.status === 200) {

            console.log("registered");
            console.log(response);
        } else {
            reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
        }
    };

    xhr.onerror = function() {
        reject(new Error("Network error"));
    };

    xhr.send(JSON.stringify(userData));
}