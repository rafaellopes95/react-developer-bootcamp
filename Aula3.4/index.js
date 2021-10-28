// const carModel = ["Onix", "T-Cross", "HB20", "Palio"];

// // FOR
// for (let index = 0; index < carModel.length; index++) {
//   console.log(carModel[index]);
// }

// // WHILE
// let index = 0;
// while (index > carModel.length) {
//   console.log(carModel[index]);
//   index++;
// }

// // FOR-OF
// for (let car of carModel) {
//   console.log(car);
// }

// Iterator
const carModelAll = {
  allModel: {
    Fiat: ["Palio", "Cronos", "Toro"],
    Volkswagen: ["Gol", "Up", "Nivus", "Tiguan"],
    Chevrolet: ["Onix", "Tracker", "Corsa"],
  },
  [Symbol.iterator]() {
    const brands = Object.values(this.allModel);

    let currentModelIndex = 0;
    let currentBrandIndex = 0;

    return {
      next() {
        // Lista de todos os modelos da marca
        const models = brands[currentBrandIndex];

        // Verifico se já naveguei todos os models e passa para a próxima brand
        if (!(currentModelIndex < models.length)) {
          currentBrandIndex++;
          currentModelIndex = 0;
        }

        // Verifica se navegou por todas as marcas
        if (!currentBrandIndex < brands.length) {
          return {
            value: undefined,
            done: true,
          };
        } else {
          return {
            value: brands[currentBrandIndex][currentModelIndex++],
            done: false,
          };
        }
      },
    };
  },
};

console.log("-----------------------------------");

for (const car of carModelAll) {
  console.log(car);
}
