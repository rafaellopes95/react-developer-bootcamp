let Carro = {
  proprietario: "Fernanda",
  ano: 2016,
};

const handler = {
  // trap no get de propriedades
  get(target, property, receiver) {
    console.log(`GET ${property}`);

    if (property in target) {
      return target[property];
    }
    return "Propriedade inexistente.";
  },
};

let carroProxy = new Proxy(Carro, handler);

console.log(Carro.ano);
console.log(carroProxy.ano);

console.log(Carro.modelo);
console.log(carroProxy.modelo);

// Exemplo de Proxy para tradutor
let tradutor = {
  Carro: "Car",
  Ano: "Year",
};

let tradutorHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      return property;
    }
  },
  // Trap de set
  set(target, property, value) {
    if (typeof value == "string") {
      target[property] = value;
      return true;
    } else {
      return false;
    }
  },
};

let tradutorProxy = new Proxy(tradutor, tradutorHandler);

console.log("--------------------------------");
console.log(tradutorProxy["Carro"]);
console.log(tradutorProxy["Modelo"]);

console.log("--------------------------------");
tradutorProxy["Modelo"] = "Model";
tradutorProxy["Marca"] = 123456;

console.log(tradutorProxy["Modelo"]);
console.log(tradutorProxy["Marca"]);
