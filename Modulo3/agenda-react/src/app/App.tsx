import { CalendarScreen } from "./CalendarScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToday } from "./dateFunctions";
import { useEffect, useState } from "react";
import { getUserEndpoint } from "./backend";

function App() {
  const month = getToday().substring(0, 7);

  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    getUserEndpoint().then(
      () => setHasSession(true),
      () => setHasSession(false)
    );
  }, []);

  if (hasSession) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/calendar/:month" element={<CalendarScreen />} />
          <Route path="/" element={<Navigate to={"/calendar/" + month} />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <div>Login</div>;
  }
}

export default App;
