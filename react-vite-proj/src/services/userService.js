import axios from "axios";

export const login = async (username, password) => {
    try {
        const loginData = {
            username: username,
            password: password
        };

        const response = await axios.post('https://localhost:7051/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
}

export const register = async (username, password, passwordConfirm) => {
    try {
        const registerData = {
            username: username,
            password: password,
            passwordConfirm: passwordConfirm
        };

        const response = await axios.post('https://localhost:7051/register', registerData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
}

export const fetchUser = async () => {
    try {
        const response = await axios.get('https://localhost:7051/users', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};