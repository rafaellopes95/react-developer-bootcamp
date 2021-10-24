// Exemplo de Proxy com Reflect
let tradutor = {
  Carro: "Car",
  Ano: "Year",
};

let tradutorHandler = {
  get(target, property) {
    if (property in target) {
      return Reflect.get(target, property);
    } else {
      return property;
    }
  },
  // Trap de set
  set(target, property, value) {
    if (typeof value == "string") {
      return Reflect.set(target, property, value);
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

// Exemplo de Reflect para ocultar propriedades no objeto
const hide = (target, prefix = "_") =>
  new Proxy(target, {
    has: (target, property) =>
      !property.startsWith(prefix) && property in target,
    get: (target, property, receiver) =>
      property in receiver ? target[property] : undefined,
    ownKeys: (target) =>
      Reflect.ownKeys(target).filter(
        (property) =>
          !property.startsWith(prefix) || typeof property !== "string"
      ),
  });

let Carro = hide({
  Ano: 2020,
  Modelo: "Polo",
  _proprietario: "João",
});

console.log("--------------------------------");
console.log(Carro._proprietario);
console.log("_proprietario" in Carro);
console.log(Object.keys(Carro));
