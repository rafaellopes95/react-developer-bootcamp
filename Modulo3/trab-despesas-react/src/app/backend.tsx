export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function getDespesas(mesAno: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${mesAno}&_sort=dia`).then(
    (response) => response.json()
  );
}
