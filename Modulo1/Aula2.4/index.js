// Exemplo de IIFE: esta é a sintaxe a ser utilizada.
(function mensagem() {
  console.log("Exemplo de IIFE.");
})();

(function () {
  console.log("Exemplo 2 de IIFE.");
})();

const unicoID = (function () {
  let count = 0;
  return function () {
    ++count;
    return `id_${count}`;
  };
})();

console.log(unicoID());
console.log(unicoID());
console.log(unicoID.count); // -> undefined pois count não está acessível no escopo global (Closure)
