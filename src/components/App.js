import React, { useState, useEffect } from "react";

import Login from "./Login";
import UserContext from "../context/UserContext";

function App() {
  const [logged, setLogged] = useState(localStorage.getItem('front-user') !== null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (logged) {

    }
  }, [logged]);

  return (
    <UserContext.Provider value={{logged, setLogged, username, setUsername}}>
      <Login />
    </UserContext.Provider>
  );
}

export default App;
