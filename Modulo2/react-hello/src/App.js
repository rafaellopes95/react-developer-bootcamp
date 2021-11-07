import { useEffect, useState } from "react";
import CheckboxInput from "./components/CheckboxInput";
import DateInput from "./components/DateInput";
import Header from "./components/Header";
import Main from "./components/Main";
import TextInput from "./components/TextInput";
import Timer from "./components/Timer";
import getAgeFrom from "./helpers/dateHelpers";
import { getNewId } from "./services/idService";

export default function App() {
  // Hook para estado
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-10");
  const [showTimer, setShowTimer] = useState(false);

  // Side effect, usado para sincronizar o estado mundo real com o estado da aplicação. Exemplo: retorno de dados do backend.
  // O useEffect executará sempre ao final da renderização, e sempre quando ele detectar alterações em algum item do seu array de dependências (neste caso, [name])
  // Caso o array de deps não seja declarado, o effect executará sempre que houver alguma alteração na app (pode sobrecarregar a app fazendo operações desnecessárias)
  // Caso o array de deps seja vazio, o effect executará apenas uma vez - não costuma ser boa prática
  useEffect(() => {
    document.title = name;
  }, [name]);

  // Closure para alterar o estado
  function handleNameChange(newName) {
    setName(newName);
  }

  function handleBirthDateChange(newBirthDate) {
    setBirthDate(newBirthDate);
  }

  function toggleShowTimer() {
    setShowTimer((currentShowTimer) => !currentShowTimer);
  }

  return (
    // Fragment, pode ser utilizado como uma div quando não há necessidade de estilização por exemplo.
    <>
      <Header size="large">react-hello</Header>
      <Main>
        {showTimer && (
          <div className="text-right mt-1">
            <Timer />
          </div>
        )}

        <CheckboxInput
          id={getNewId()}
          labelDescription="Mostrar cronômetro"
          onCheckboxChange={toggleShowTimer}
        />

        <TextInput
          id={getNewId()}
          labelDescription="Digite o seu nome:"
          inputValue={name}
          onInputChange={handleNameChange}
          // esta prop é do tipo boolean, que quando passada é true, e que quando omitida é false
          autoFocus
        />
        <DateInput
          id={getNewId()}
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
