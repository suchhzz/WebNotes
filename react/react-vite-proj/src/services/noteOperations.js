let xhr = new XMLHttpRequest();

export const deleteNote = function(id) {
    xhr.open('DELETE', `https://localhost:7051/notes/delete/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status == 200) {
            console.log(`note ${id} deleted`);
        }
    }
    xhr.send();

    document.getElementById(id).remove();
}

export const createNote = function (title, description) {
    xhr.open('POST', 'https://localhost:7051/notes/create');
    xhr.setRequestHeader("Content-Type", "application/json");

    const noteData = {
        title: title,
        description: description,
    };


    xhr.onload = function() {
        if (xhr.status == 200) {
            console.log(`new note created, ${JSON.parse(xhr.response)}`);
        }
    }
    xhr.send(JSON.stringify(noteData));

    window.location.reload();
}