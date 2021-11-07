import { useEffect, useState } from "react";

export default function Timer() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Forma de incrementar o estado atual de uma variável
    setInterval(() => {
      setValue((currentValue) => currentValue + 1);
    }, 1000);
  }, []);

  return <span className="bg-red-200 p-3 font-semibold">{value}</span>;
}
