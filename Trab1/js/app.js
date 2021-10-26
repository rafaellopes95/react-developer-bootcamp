var productName;
var selectedBrand;
var selectedType;
var selectedSort = "rating";

function setProductName(value) {
  productName = value;
}

function setSelectedOption(option, value) {
  switch (option) {
    case "brand":
      selectedBrand = value;
      break;
    case "type":
      selectedType = value;
      break;
    case "sort":
      selectedSort = value;
      break;
  }
}

function initializeAllFilters() {
  fetchAllProducts().then((data) => {
    // Populate brand options
    const brandOption = document.getElementById("filter-brand");
    const brandSet = new Set(
      data
        .map((product) => product.brand)
        .filter((brand) => brand)
        .sort()
    );
    brandSet.forEach((brand) => {
      brandOption.innerHTML += `<option value="${brand}">${brand}</option>`;
    });

    // Populate type options
    const typeOption = document.getElementById("filter-type");
    const typeSet = new Set(
      data
        .map((product) => product.product_type)
        .filter((type) => type)
        .sort()
    );
    typeSet.forEach((type) => {
      typeOption.innerHTML += `<option value="${type}">${type}</option>`;
    });
  });
}

function renderProducts() {
  fetchProductsWithFilter().then((data) => {
    productsData = data;
    // Populate catalog products
    const catalog = document.getElementById("catalog");
    catalog.innerHTML = "";
    data.forEach((product) => {
      catalog.innerHTML += getProductItem(product);
    });
  });
}

function fetchAllProducts() {
  return fetch("data/products.json")
    .then((response) => {
      return response.json().then((data) => Promise.resolve(data));
    })
    .catch((error) => {
      console.error("ERRO!!!");
      console.error(error);
      return Promise.reject(error);
    });
}

function fetchProductsWithFilter() {
  return fetchAllProducts()
    .then((products) => {
      return products
        .sort(getSortingFunction())
        .filter((product) =>
          selectedBrand ? product.brand === selectedBrand : true
        )
        .filter((product) =>
          selectedType ? product.product_type === selectedType : true
        )
        .filter((product) =>
          productName ? product.name.toLowerCase().includes(productName) : true
        )
        .slice(0, 25);
    })
    .catch((error) => {
      console.error("ERRO!!!");
      console.error(error);
      return Promise.reject(error);
    });
}

function getSortingFunction() {
  let sortingFunction;
  switch (selectedSort) {
    case "rating":
      sortingFunction = ratingSorting;
      break;
    case "lowest-price":
      sortingFunction = lowestPriceSorting;
      break;
    case "highest-price":
      sortingFunction = highestPriceSorting;
      break;
    case "a-z":
      sortingFunction = aToZSorting;
      break;
    case "z-a":
      sortingFunction = zToASorting;
      break;
  }

  return sortingFunction;
}

function getProductItem(product) {
  const { brand, name, image_link, product_type, price, category, rating } =
    product;
  const priceBrl = price ? convertToBrl(price) : 0;

  return `<div class="product" data-name=${name} data-brand=${brand} data-type=${product_type} tabindex="508">
    <figure class="product-figure">
      <img src=${image_link} width="215" height="215" alt=${name} onerror="javascript:this.src='img/unavailable.png'">
    </figure>
    <section class="product-description">
      <h1 class="product-name">${name}</h1>
      <div class="product-brands"><span class="product-brand background-brand">${brand}</span>
  <span class="product-brand background-price">R$ ${priceBrl}</span></div>
    </section>
    ${getProductDetails(brand, priceBrl, category, rating, product_type)}
  </div>`;
}

function getProductDetails(brand, price, category, rating, product_type) {
  return `<section class="product-details"><div class="details-row">
         <div>Brand</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${brand}</div>
         </div>
       </div><div class="details-row">
         <div>Price</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${price}</div>
         </div>
       </div><div class="details-row">
         <div>Rating</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${rating || 0}</div>
         </div>
       </div><div class="details-row">
         <div>Category</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${category}</div>
         </div>
       </div><div class="details-row">
         <div>Product_type</div>
         <div class="details-bar">
           <div class="details-bar-bg" style="width= 250">${product_type}</div>
         </div>
       </div></section>`;
}

const convertToBrl = (amount) => amount * 5.5;
const aToZSorting = (a, b) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();
  return aName === bName ? 0 : bName > aName ? -1 : 1;
};
const zToASorting = (a, b) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();
  return aName === bName ? 0 : aName > bName ? -1 : 1;
};
const ratingSorting = (a, b) => (b.rating || 0) - (a.rating || 0);
const lowestPriceSorting = (a, b) => a.price - b.price;
const highestPriceSorting = (a, b) => b.price - a.price;
