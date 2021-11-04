function escopoDeBloco() {
  if (true) {
    const message = "olá";
    console.log(message);
  }
  // console.log(message); -> ReferenceError: message is not defined
}

function escopoDeBlocoComVar() {
  // VAR não possui escopo de bloco local. Neste caso, ele é global dentro desta função.
  if (true) {
    var count = 0;
    console.log("Count de VAR dentro bloco onde foi declarado: " + count);
  }
  console.log("Count de VAR fora bloco onde foi declarado: " + count);
}

function escopoDeFuncaoComVar() {
  // Este VAR dentro da função possui escopo local de função, o que significa que a variável não é acessível fora da função.
  function executar() {
    var text = "Escopo local com VAR";
    console.log(text);
  }
  executar();
  //console.log(text); -> ReferenceError: text is not defined
}

function escopoLocalComLetEConst() {
  // CONST e LET serão sempre escopo local em blocos ou funções.
  function executar() {
    let txt = "0";
    const num = 2;

    function executar2() {}

    console.log(txt);
    console.log(num);
    console.log(executar2);
  }
  executar();
  //console.log(txt); -> ReferenceError: txt is not defined
  //console.log(num); -> ReferenceError: num is not defined
  //console.log(executar2); -> ReferenceError: executar2 is not defined
}

function escopoAninhado() {
  // O escopo externo à um bloco está diretamente acessível.
  const txt = "Escopo aninhado!";

  if (true) {
    const name = "Rafael";
    console.log(txt);
  }

  //console.log(name); -> ReferenceError: name is not defined
}

function hoisting() {
  // Hoisting é o mecanismo do JavaScript que move as declarações de variáveis e funções para o início do código por baixo dos panos, permitindo que no código haja a chamada antes da declaração.
  printName();

  function printName() {
    console.log("Nome: " + gName);
  }
}

/* Escopos */
// escopoDeBloco();
// escopoDeBlocoComVar();
// escopoDeFuncaoComVar();
// escopoLocalComLetEConst();
// escopoAninhado();

/* Variável de escopo global */
let gName = "Rafael";
hoisting();
