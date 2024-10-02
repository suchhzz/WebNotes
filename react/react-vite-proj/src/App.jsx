import MainComponent from "./components/MainComponent"
import LoginComponent from "./components/LoginComponent";
import { getUser } from "./services/userService";
import { useEffect, useState } from "react"

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async() => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    }

    checkAuth();
  }, []);

  if (user) {


    console.log("returning main");

    return (
      <MainComponent />

    )} else {

      console.log("returning login");
      
      return (

        

        <LoginComponent onRegister={(newUser) => setUser(newUser)}/>
      )
    }
}

