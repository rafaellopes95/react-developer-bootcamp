function Pessoa(nome) {
  if (!nome) this.nome = "Fulano";
  else this.nome = nome;

  this.dizerOla = () => console.log(this.nome + " diz: Olá!");
}

let pessoaA = new Pessoa("Alberto");

// Mesmo a gente implementando um novo método para Pessoa desta forma, ele não é atribuído às instâncias (nem existentes, nem novas).
Pessoa.digaOla = function () {
  console.log("Olá, meu nome é: " + this.nome);
};

let pessoaB = new Pessoa("Maria");

console.log("----------------------------------------");

try {
  pessoaA.digaOla();
} catch (e) {
  console.log("Falha no pessoaA.digaOla");
}

try {
  pessoaB.digaOla();
} catch (e) {
  console.log("Falha no pessoaB.digaOla");
}

console.log("----------------------------------------");

// Agora que o método é adicionada para esta instância ela funciona, porém haverá repetição de código para que todas as instâncias possam ter o mesmo comportamento.
pessoaB.digaOla = function () {
  console.log("Oi, meu nome é " + pessoaB.nome);
};

try {
  pessoaA.digaOla();
} catch (e) {
  console.log("Falha no pessoaA.digaOla");
}

try {
  pessoaB.digaOla();
} catch (e) {
  console.log("Falha no pessoaB.digaOla");
}

console.log("----------------------------------------");

// Adicionando a implementação ao prototype de Pessoa fará com que todas as instâncias tenham acesso à implementação default do digaOla
// Como o pessoaB possui uma sobrescrita do método, ele utilizou a sua própria implementação.
Pessoa.prototype.digaOla = function () {
  console.log("Olá, eu me chamo " + this.nome);
};

let pessoaC = new Pessoa("Ana");

try {
  pessoaA.digaOla();
} catch (e) {
  console.log("Falha no pessoaA.digaOla");
}

try {
  pessoaB.digaOla();
} catch (e) {
  console.log("Falha no pessoaB.digaOla");
}

try {
  pessoaC.digaOla();
} catch (e) {
  console.log("Falha no pessoaC.digaOla");
}

console.log("----------------------------------------");

// Como pessoaA e pessoaC possuem uma implementação de dizerOla no escopo de função (ver implementação da function Pessoa no início do código), a implementação abaixo será ignorada por eles.
// E como pessoaB sobrescreveu o dizerOla abaixo, esta implementação do prototype também será ignorada.
Pessoa.prototype.dizerOla = function () {
  console.log(this.nome + " vou dizer outro olá!");
};

pessoaB.dizerOla = function () {
  console.log(this.nome + " consigo dizer outro olá!");
};

try {
  pessoaA.dizerOla();
} catch (e) {
  console.log("Falha no pessoaA.digaOla");
}

try {
  pessoaB.dizerOla();
} catch (e) {
  console.log("Falha no pessoaB.digaOla");
}

try {
  pessoaC.dizerOla();
} catch (e) {
  console.log("Falha no pessoaC.digaOla");
}
