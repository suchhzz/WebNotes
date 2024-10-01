export const deleteList = function(id) {
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', `https://localhost:7051/lists/delete/${id}`);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status == 200) {
            console.log(`list ${id} deleted`);
        }
    }

    xhr.send();

    document.getElementById(id).remove();
}

export const createList = function (title, contents) {
    xhr.open('POST', 'https://localhost:7051/lists/create');
    xhr.setRequestHeader("Content-Type", "application/json");

    const listData = {
        title: title,
        contents: contents,
    };


    xhr.onload = function() {
        if (xhr.status == 200) {
            console.log(`new note created, ${JSON.parse(xhr.response)}`);
        }
    }
    xhr.send(JSON.stringify(listData));

    window.location.reload();
}