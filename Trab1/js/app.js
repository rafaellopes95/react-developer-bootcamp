let productsData;
let brands;
let types;

function renderProducts() {
  fetchProducts().then((data) => {
    console.log("Produtos carregados!");
    productsData = data;
    // console.log(data);

    // Populate brand options
    const brandOption = document.getElementById("filter-brand");
    data
      .map((product) => product.brand)
      .filter((brand) => brand)
      .forEach((brand) => {
        brandOption.innerHTML += `<option value="${brand}">${brand}</option>`;
      });

    // Populate type options
    const typeOption = document.getElementById("filter-type");
    data
      .map((product) => product.product_type)
      .filter((type) => type)
      .forEach((type) => {
        typeOption.innerHTML += `<option value="${type}">${type}</option>`;
      });

    // Populate catalog products
    const catalog = document.getElementById("catalog");
    data.forEach((product) => {
      catalog.innerHTML += getProductItem(product);
    });
  });
}

function fetchBrandOptions() {
  return fetch("http://makeup-api.herokuapp.com/api/v1/products.json", {
    method: "GET",
  })
    .then((response) => {
      return response.json().then((data) => Promise.resolve([data[0]]));
    })
    .catch((error) => {
      console.error("ERRO!!!");
      console.error(error);
      return Promise.reject(error);
    });
}

function fetchProducts() {
  return fetch("http://makeup-api.herokuapp.com/api/v1/products.json", {
    method: "GET",
  })
    .then((response) => {
      return response.json().then((data) => Promise.resolve([data[0]]));
    })
    .catch((error) => {
      console.error("ERRO!!!");
      console.error(error);
      return Promise.reject(error);
    });
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

renderProducts();
