let productList = document.querySelector("#product-list");
console.log(productList);

let fetchData = async () => {
  class Product {
    constructor(object) {
      this.name = object.name;
      this.price = object.price;
      this.category = object.category;
      this.description = object.description;
      this.image = object.image;
    }
    render() {
      productList.innerHTML += `
        <div
                class="col-sm-9 col-md-6 col-lg-4 row justify-content-center"
              >
                <div class="card col-11">
                  <div class="card-body d-flex flex-column justify-content-between">
                    <div class="card-img">
                      <img
                        src="${this.image}"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                    <h2 class="card-title fs-4">${this.name}</h2>
                    <p class="lead fs-6 my-1">
                      ${this.description}
                    </p>
                    <div class="d-flex py-1 justify-content-between">
                      <span class="lead fs-4">${this.price}</span>
                      <button class="btn btn-warning">Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>`;
    }
  }

  let products = [];
  let data = await fetch("/data/products.json");
  data = await data.json();
  let dataKeys = Object.keys(data);
  dataKeys.forEach((key) => {
    products.push(new Product(data[key]));
  });
  productList.innerHTML = "";
  products.forEach((product) => {
    product.render();
    console.log("ejama");
  });
};

fetchData();
