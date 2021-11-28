import { CalendarScreen } from "./CalendarScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToday } from "./dateFunctions";
import { useEffect, useState } from "react";
import { getUserEndpoint, IUser } from "./backend";
import { LoginScreen } from "./LoginScreen";

function App() {
  const month = getToday().substring(0, 7);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  if (user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/calendar/:month" element={<CalendarScreen />} />
          <Route path="/" element={<Navigate to={"/calendar/" + month} />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
