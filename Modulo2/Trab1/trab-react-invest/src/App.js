import Investments from "./pages/Investments";

export default function App() {
  return (
    <div>
      <header>
        <div className="bg-blue-300 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">
            react-investments
          </h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          <h2>Investimentos</h2>
          <Investments />
        </div>
      </main>
    </div>
  );
}
