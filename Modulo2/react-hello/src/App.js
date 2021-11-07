import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  // Hook para estado
  const [name, setName] = useState("Rafael");

  // Closure para alterar o estado
  function handleNameChange(event) {
    const newName = event.currentTarget.value;
    setName(newName);
  }

  return (
    // Fragment, pode ser utilizado como uma div quando não há necessidade de estilização por exemplo.
    <>
      <Header size="large">react-hello</Header>
      <Main>
        <div className="flex flex-col my-4">
          <label className="text-sm mb-1" htmlFor="inputName">
            Digite o seu nome:
          </label>
          <input
            autoFocus
            id="inputName"
            className="border p-1"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <p>
          O seu nome é {name}, com {name.length} caracteres, e você possui 20
          anos.
        </p>
      </Main>
    </>
  );
}
