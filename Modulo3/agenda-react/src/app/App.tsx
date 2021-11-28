import { CalendarScreen } from "./CalendarScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToday } from "./dateFunctions";
import { useEffect, useState } from "react";
import { getUserEndpoint, IUser } from "./backend";
import { LoginScreen } from "./LoginScreen";
import { authContext } from "./authContext";

function App() {
  const month = getToday().substring(0, 7);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      // O useContext permite compartilhar props sem que haja necessidade de cascatear uma propriedade até o componente que irá utilizar, pois qualquer componente englobado pelo context pode acessá-lo
      <authContext.Provider value={{ user, onSignOut }}>
        <BrowserRouter>
          <Routes>
            <Route path="/calendar/:month" element={<CalendarScreen />} />
            <Route path="/" element={<Navigate to={"/calendar/" + month} />} />
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
