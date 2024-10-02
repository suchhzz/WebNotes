import { useEffect, useState } from "react"
import { getUser } from "../services/userService"

export default function Header() {

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.error("Ошибка при получении пользователя:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <header className="container">
            <div className="row text-center">
                <div className="col-6">
                    <p>content</p>
                </div>
                <div className="col-6">
                    <p>content</p>
                </div>
            </div>
        </header>
    )
}