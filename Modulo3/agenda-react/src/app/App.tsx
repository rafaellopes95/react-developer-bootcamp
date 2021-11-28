import { CalendarScreen } from "./CalendarScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToday } from "./dateFunctions";
import { useEffect, useState } from "react";
import { getUserEndpoint, IUser } from "./backend";
import { LoginScreen } from "./LoginScreen";
import { userContext } from "./authContext";

function App() {
  const month = getToday().substring(0, 7);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, signOut);
  }, []);

  function signOut() {
    setUser(null);
  }

  if (user) {
    return (
      // O useContext permite compartilhar props sem que haja necessidade de cascatear uma propriedade até o componente que irá utilizar, pois qualquer componente englobado pelo context pode acessá-lo
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/calendar/:month"
              element={<CalendarScreen onSignOut={signOut} />}
            />
            <Route path="/" element={<Navigate to={"/calendar/" + month} />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
