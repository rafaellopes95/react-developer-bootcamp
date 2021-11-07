import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  console.log("Teste no console do navegador");

  return (
    // Fragment, pode ser utilizado como uma div quando não há necessidade de estilização por exemplo.
    <>
      <Header size="large">react-hello</Header>
      <Main>
        <div className="container mx-auto p-4">
          <p>O seu nome é Rafael, com 6 caracteres, e você possui 20 anos.</p>
        </div>
      </Main>
    </>
  );
}
