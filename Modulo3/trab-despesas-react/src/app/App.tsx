import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToday } from "./dateFunctions";
import { DespesasScreen } from "./DespesasScreen";

function App() {
  const month = getToday().substring(0, 7);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/despesas/:month" element={<DespesasScreen />} />
        <Route path="/" element={<Navigate to={"/despesas/" + month} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
