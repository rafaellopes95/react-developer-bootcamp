// Exemplo Promise.resolve
// Promise.resolve(console.log("Sempre será resolvida"));

// Exemplo Promise.reject
// Promise.reject(console.log("Sempre será rejeitada"));

// Exmplo Promise.all
Promise.all([
  new Promise((resolve) => setTimeout(resolve, 1200, "P1")),
  new Promise((resolve) => setTimeout(resolve, 700, "P2")),
  new Promise((resolve) => setTimeout(resolve, 3000, "P3")),
])
  .then((results) => results.data[0].name)
  .then((name) => console.info(name))
  .catch((erro) => console.error(`Exceção lançada na: ${erro}`));

// Exmplo Promise.all - Sucesso na execução de todas as promises
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve([]), 1200)),
  new Promise((resolve) => setTimeout(() => resolve([10]), 700)),
  new Promise((resolve) => setTimeout(() => resolve([3, 4]), 3000)),
])
  .then((results) => results.length)
  .then((size) => console.info(size))
  .catch((erro) => console.error(erro));

// Exmplo Promise.all - Uma das promises será rejeitada
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve([]), 1200)),
  new Promise((resolve, reject) => setTimeout(() => reject([10]), 700)),
  new Promise((resolve) => setTimeout(() => resolve([3, 4]), 3000)),
])
  .then((results) => results.length)
  .then((size) => console.info(size))
  .catch((erro) => console.error(erro));

// Exemplo Promise.race - Corrida de promises, qual retorna primeiro.

const p5 = Promise.race([
  new Promise((resolve) => setTimeout(resolve, 2000, "P1")),
  new Promise((resolve, reject) => setTimeout(reject, 3000, "P2")),
]);

p5.then((result) => console.log(result));
p5.catch((error) => console.error(error));

// Exemplo Promise.race - Varias promises com rejeição

const p6 = Promise.race([
  new Promise((resolve) => setTimeout(resolve, 3000, "P1")),
  new Promise((resolve, reject) => setTimeout(reject, 2000, "P2")),
  new Promise((resolve) => setTimeout(resolve, 4000, "P3")),
]);

p6.then((result) => console.log(result));
p6.catch((error) => console.error(error));
