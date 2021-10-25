// Exemplo 1 - para criação de promise e execução
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Sucesso p1"), 2000);
});

p1.then(
  (res) => {
    console.log(res);
  },
  (rej) => {}
);

new Promise((resolve, reject) => {
  setTimeout(() => resolve("Sucesso p1"), 2000);
}).then(
  (res) => {
    console.log(res);
  },
  (rej) => {}
);

// Exemplo 2 - para criação de promise e uso do catch
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Sucesso p2"), 2000);
});

p2.then((res) => {
  console.log(res);
});
p2.catch((rej) => {});

p2.then((res) => {
  console.log(res);
}).catch((rej) => {});

// Exemplo 3 - Promises com um único catch para todas as rejeições

const p3 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P3");
  } else {
    reject("Falha P3");
  }
});

p3.then(console.log).catch(console.error);

// Exemplo 4 - Encadeamento de then e o catch

const p4 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P4");
  } else {
    reject("Falha P4");
  }
});

p4.then(function acao1(res) {
  console.log(`${res} da ação 1`);
  return res;
})
  .then(function acao2(res) {
    console.log(`${res} da ação 2`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3`);
    return res;
  })
  .catch(function erro(rej) {
    console.log(rej);
  });

// Exemplo 5 - Encadeamento de catchs
const p5 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P5");
  } else {
    reject("Falha P5");
  }
});

p5.then(function acao1(res) {
  console.log(`${res} da ação 1`);
  return res;
})
  .catch(function erro1(rej) {
    // Esse catch só ocorrerá na falha do 1º then
    console.error("Erro no primeiro catch");
    return rej;
  })
  .then(function acao2(res) {
    console.log(`${res} da ação 2`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3`);
    return res;
  })
  .catch(function erro2(rej) {
    console.log(rej);
  });

// Exemplo 6 -Encadeamento de catchs diretamente na primeira promise, os dois são executados
const p6 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P6");
  } else {
    reject("Falha P6");
  }
});

// Como os catches são vinculados diretamente à promise, ambos serão executados caso haja um erro na promise.
p6.catch(function erro1(rej) {
  console.error("erro no primeiro catch");
  return rej;
});
p6.catch(function erro2(rej) {
  console.error(rej);
});

p6.then(function acao1(res) {
  console.log(`${res} da ação 1`);
  return res;
})
  .then(function acao2(res) {
    console.log(`${res} da ação 2`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3`);
    return res;
  });

// Exemplo 7 - Encadeamento de thens e catchs com excecao no meio do fluxo
const p7 = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Sucesso P7");
  } else {
    reject("Falha P7");
  }
});

p7.catch(function erro1(rej) {
  console.error("Erro no primeiro catch P7");
  return rej;
});

p7.then(function acao1(res) {
  console.log("Promessa rejeitada P7 na acao1");
  throw new Error("Erro");
})
  .catch(function erro2(rej) {
    console.error("Tratamento das rejeições em P7 ou acao 1");
    return rej;
  })
  .then(function acao2(res) {
    console.log(`${res} da ação 2`);
    return res;
  })
  .then(function acao3(res) {
    console.log(`${res} da ação 3`);
    return res;
  })
  .catch(function erro3(rej) {
    console.error("Tratamento das rejeições em acao2 3 acao3");
  });
