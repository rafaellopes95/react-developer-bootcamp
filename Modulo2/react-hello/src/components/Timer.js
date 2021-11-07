import { useEffect, useState } from "react";

export default function Timer() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Forma de incrementar o estado atual de uma variável
    const interval = setInterval(() => {
      setValue((currentValue) => currentValue + 1);
    }, 1000);

    // Função de limpeza, prevenindo memory leak já que o interval continuará caso esta function não seja retornada
    // O erro causado sem ela é o 'cant perform a React state update on an unmounted component'
    return () => {
      console.log("Limpando interval");
      clearInterval(interval);
    };
  }, []);

  return <span className="bg-red-200 p-3 font-semibold">{value}</span>;
}
