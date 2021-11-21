import { CalendarScreen } from "./CalendarScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToday } from "./dateFunctions";

function App() {
  const month = getToday().substring(0, 7);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/calendar/:month" element={<CalendarScreen />} />
        <Route path="/" element={<Navigate to={"/calendar/" + month} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
