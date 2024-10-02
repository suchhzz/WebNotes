export const deleteList = function(id) {

    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', `https://localhost:7051/lists/delete/${id}`);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(`list ${id} deleted`);
            // Удаление элемента после того, как запрос завершен
            document.getElementById(id).remove();
        } else if (xhr.readyState === 4) {
            console.error('Error deleting list:', xhr.status, xhr.statusText);
        }
    }


    xhr.send();

    document.getElementById(id).remove();
}

export const createList = function (title, contents) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://localhost:7051/lists/create');
    xhr.setRequestHeader("Content-Type", "application/json");

    const listData = {
        title: title,
        contents: contents,
    };


    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(`new note created, ${JSON.parse(xhr.response)}`);
            
            window.location.reload();
        } else if (xhr.readyState === 4) {
            console.error('Error creating list:', xhr.status, xhr.statusText);
        }
    }

    xhr.send(JSON.stringify(listData));
}

export const checkList = function (title, listItemObj) {
    let xhr = new XMLHttpRequest();

    xhr.open('PUT', 'https://localhost:7051/lists/check');
    xhr.setRequestHeader("Content-Type", "application/json");

    const checkListData = {
        id: listItemObj.id,
        title: title,
        text: listItemObj.text,
    };


    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(`new note created, ${JSON.parse(xhr.response)}`);
        } else if (xhr.readyState === 4) {
            console.error('Error creating list:', xhr.status, xhr.statusText);
        }
    }

    xhr.send(JSON.stringify(checkListData));
}