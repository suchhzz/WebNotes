import axios from 'axios';

export const deleteNote = async function (id) {
    try {
        const response = await axios.delete(`https://localhost:7051/notes/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log(`Note ${id} deleted`);
            document.getElementById(id).remove();
        }
    } catch (error) {
        console.error('Error deleting note:', error.response?.status, error.message);
    }
};

export const createNote = async function (title, description) {
    try {
        const noteData = {
            title: title,
            description: description
        };

        const response = await axios.post('https://localhost:7051/notes/create', noteData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log(`New note created:`, response.data);
            window.location.reload();
        }
    } catch (error) {
        console.error('Error creating note:', error.response?.status, error.message);
    }
};

export const editNote = async function (id, title, description) {
    try {
        const noteData = {
            id: id,
            title: title,
            description: description
        }

        const response = await axios.put(`https://localhost:7051/notes/update/${id}`, noteData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log("note updated: ");
            console.log(response.data);
            window.location.reload();
        }
    }
    catch (error) {
        console.error(`note update error:`, error.response?.status, error.message);
    }
}