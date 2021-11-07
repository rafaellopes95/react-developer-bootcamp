import { useState } from "react";
import DateInput from "./components/DateInput";
import Header from "./components/Header";
import Main from "./components/Main";
import TextInput from "./components/TextInput";
import getAgeFrom from "./helpers/dateHelpers";

export default function App() {
  // Hook para estado
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-10");

  // Closure para alterar o estado
  function handleNameChange(newName) {
    setName(newName);
  }

  function handleBirthDateChange(newBirthDate) {
    setBirthDate(newBirthDate);
  }

  return (
    // Fragment, pode ser utilizado como uma div quando não há necessidade de estilização por exemplo.
    <>
      <Header size="large">react-hello</Header>
      <Main>
        <TextInput
          labelDescription="Digite o seu nome:"
          inputValue={name}
          onInputChange={handleNameChange}
        />
        <DateInput
          labelDescription="Digite a sua data de nascimento:"
          inputValue={birthDate}
          onInputChange={handleBirthDateChange}
        />
        <p>
          O seu nome é {name}, com {name.length} caracteres, e você possui{" "}
          {getAgeFrom(birthDate)} anos.
        </p>
      </Main>
    </>
  );
}
