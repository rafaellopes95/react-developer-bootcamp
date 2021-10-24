function IMC() {
  let altura = 1.8;

  function calcula() {
    let peso = 70;
    console.log("IMC: " + peso / (altura * altura));
  }
  return calcula;
}

// Não é permitido chamar uma função que retorna outra função diretamente, por isso ela está sendo feita através de uma variável.
let imc = IMC();
// imc();

// Exemplo de encapsulamento: enquanto o atributo pode ser acessado diretamente, o atributo ano é como se tivesse visibilidade private e só é acessivel através do getter.
function Carro() {
  this.proprietario = "Marcos";
  let ano = 2020;

  this.getAno = function () {
    return ano;
  };

  this.setAno = function (a) {
    ano = a;
  };
}

let carro = new Carro();
console.log(carro.proprietario);
console.log(carro.ano); // -> undefined, pois esta variável está em escopo de função.
// Na linha abaixo ocorre o acesso de um escopo que não é acessível diretamente através de encapsulamento:
console.log(carro.getAno());
