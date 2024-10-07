import axios from "axios";

export const deleteList = async(id) => {

    try {
        const response = await axios.delete(`https://localhost:7051/lists/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log(`list ${id} deleted`);
            
            document.getElementById(id).remove();
        }
    } catch (error) {
        console.error('Error deleting list:', error.response?.status, error.message);
    }
}

export const createList = async function (title, contents) {
    try {
        const listData = {
            title: title,
            contents: contents,
        };

        const response = await axios.post('https://localhost:7051/lists/create', listData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log(`new list created, ${response.data}`);
            window.location.reload();
        }
    } catch (error) {
        console.error('Error creating list:', error.response?.status, error.message);
    }
};

export const checkList = async function (title, listItemObj) {
    try {
        const checkListData = {
            id: listItemObj.id,
            title: title,
            text: listItemObj.text,
        };

        const response = await axios.put('https://localhost:7051/lists/check', checkListData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log(`List checked successfully:`, response.data);
        }
    } catch (error) {
        console.error('Error checking list:', error.response?.status, error.message);
    }
};

export const editList = async function (id, title, contents) {
    try {
        const listData = {
            id: id,
            title: title,
            contents: contents
        }

        console.log("List data being sent:", listData);


        const response = await axios.put(`https://localhost:7051/lists/update/${id}`, listData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log("list updated: ");
            console.log(response.data);
            window.location.reload();
        }
    }
    catch (error) {
        console.error(`list update error:`, error.response?.status, error.message);
    }
}