//EXEMPLO FUNCAO GERADORA

function getIDNormal(range) {
  let i = 0;
  while (i < range) {
    i++;
    return i;
  }
}

function* getID(range) {
  let i = 0;
  while (i < range) {
    i++;
    // yeild é o return de uma função geradora
    yield i;
  }
}

let it = getID(3);

console.log(it);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

//FOR OF
let it2 = getID(3);
for (const item of it2) {
  console.log(item);
}

// asterisco indica que esta é uma função geradora
function* getUniqueID() {
  let i = 0;
  while (true) {
    i++;
    yield i;
  }
}

const cars = {};
const idCarsGenerator = getUniqueID();

function addCar(car) {
  const id = idCarsGenerator.next().value;
  cars[id] = { id, car };
}

addCar("Palio");
addCar("Fox");
addCar("Mobi");
addCar("HB20");
addCar("BMW");
addCar("Ferrari");
addCar("Tiguan");

console.log(cars);

const carModelAll = {
  allModel: {
    Fiat: ["Palio", "Cronos", "Toro"],
    Volksvagem: ["Gol", "Up", "Nivus", "Tiguan"],
    Chevrolet: ["Onix", "Tracker", "Corsa"],
  },
  [Symbol.iterator]() {
    const brands = Object.values(this.allModel);

    let currentModelIndex = 0;
    let currentBrandIndex = 0;

    return {
      next() {
        //Lista de todos os modelos da marca
        const models = brands[currentBrandIndex];
        //Verifica se ja navegou em todos os modelos da marca e passa para a proxima
        if (!(currentModelIndex < models.length)) {
          currentBrandIndex++;
          currentModelIndex = 0;
        }
        //Verifica se ja navegou em todas as marcas
        if (!(currentBrandIndex < brands.length)) {
          return {
            value: undefined,
            done: true,
          };
        }

        return {
          value: brands[currentBrandIndex][currentModelIndex++],
          done: false,
        };
      },
    };
  },
  *carGenerator() {
    const brands = Object.values(this.allModel);
    let currentBrandIndex = 0;

    while (currentBrandIndex < brands.length) {
      // a função está delegando a iteração dos models para este yield
      yield* brands[currentBrandIndex];
      currentBrandIndex++;
    }
  },
};

let itA = carModelAll.carGenerator();

console.log(itA.next());
console.log(itA.next());
console.log(itA.next());
console.log(itA.next());
console.log(itA.next());

for (const car of carModelAll.carGenerator()) {
  console.log(car);
}

//Destructing
itB = carModelAll.carGenerator();
console.log([...itB]);
