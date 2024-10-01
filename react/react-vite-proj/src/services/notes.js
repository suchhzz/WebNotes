export const getNotes = function() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "https://localhost:7051/notes");

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.response);
                resolve(response); // Возвращаем результат через resolve
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

export const getLists = function() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "https://localhost:7051/lists");

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
}