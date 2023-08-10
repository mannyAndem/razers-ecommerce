let productDisplay = document.querySelector("#product-list");
let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
let categories = document.querySelectorAll(".category");
let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

//Asynchronous function to fetch the products from the json file and render them
let fetchData = async () => {
  //Product class to give each product some useful functionality like rendering and add to cart.
  class Product {
    constructor(object) {
      this.name = object.name;
      this.price = object.price;
      this.category = object.category;
      this.description = object.description;
      this.image = object.image;
      this.addedToCart = false;
    }
    render() {
      productDisplay.innerHTML += `
        <div
                class="card col-md-12 col-lg-5 col-xxl-3 row justify-content-center"
              >
                  <div class="card-body d-flex flex-column justify-content-between">
                    <div class="card-img h-40">
                      <img
                        src="${this.image}"
                        alt=""
                        class="product-img"
                      />
                    </div>
                    <h2 class="card-title fs-4">${this.name}</h2>
                    <p class="lead fs-6 my-1">
                      ${this.description}
                    </p>
                    <div class="d-flex py-1 justify-content-between">
                      <span class="lead fs-4">N${this.price.toLocaleString()}</span>
                      ${(() => {
                        if (!this.addedToCart) {
                          return `<button class="btn btn-warning add-to-cart-btn w-50">Add to cart</button>`;
                        } else {
                          return `<button class="btn btn-outline-success add-to-cart-btn w-50">Added</button>`;
                        }
                      })()}
                    </div>
                </div>
              </div>`;
    }
    addToCart() {
      cart.push(this);
    }
  }

  let data = await fetch("/data/products.json");
  data = await data.json();

  //Creating a new instance of the product class from each product in the json file and pushing it to the products array
  let dataKeys = Object.keys(data);
  dataKeys.forEach((key) => {
    products.push(new Product(data[key]));
  });
  productDisplay.innerHTML = "";
  products.forEach((product) => {
    product.render();
  });
};

fetchData();
updateCart();

//Adding an event handler to the add-to-cart buttons by attaching an event listener to the containing productDisplay element and relying on event bubbling to register the click

productDisplay.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    e.target.classList.add("btn-outline-success", "text-success");
    e.target.classList.remove("btn-warning");
    e.target.innerText = "Added";
    let targetName =
      e.target.parentElement.parentElement.querySelector(
        ".card-title"
      ).innerHTML;
    products.forEach((product) => {
      if (product.name == targetName) {
        product.addedToCart = true;
        if (cart.indexOf(product) == -1) {
          product.addToCart();
          updateCart();
        }
      }
    });
  }
});

//Adding an event handler for the search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("ok");
  let searchValue = searchInput.value;
  if (searchValue) {
    productDisplay.innerHTML = "";
    searchProducts(searchValue).forEach((product) => {
      console.log(product);
      product.render();
    });
  }
});
//Updating product display back to full product list if search input is empty
searchInput.addEventListener("input", () => {
  if (!searchInput.value) {
    productDisplay.innerHTML = "";
    products.forEach((product) => {
      product.render();
    });
  }
});

//Adding an event handler for the category btns
categories.forEach((category) => {
  category.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-outline-warning")) {
      e.target.classList.add("btn-warning");
      e.target.classList.remove("btn-outline-warning");
      categories.forEach((category) => {
        if (category != e.target) {
          category.classList.add("btn-outline-warning");
          category.classList.remove("btn-warning");
        }
        productDisplay.innerHTML = "";
        products.forEach((product) => {
          if (
            product.category.indexOf(e.target.innerText.toLowerCase()) != -1
          ) {
            product.render();
          } else if (e.target.innerText == "All") {
            product.render();
          }
        });
      });
    } else {
      e.target.classList.add("btn-outline-warning");
      e.target.classList.remove("btn-warning");
      productDisplay.innerHTML = "";
      products.forEach((product) => {
        product.render();
      });
    }
  });
});

//Updating the cart in local storage and then changing the UI to show number of products in the cart.
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  const cartItemNumber = document.querySelector("#cart-item-number");
  if (cart.length > 0) {
    cartItemNumber.innerHTML = cart.length;
    cartItemNumber.classList.remove("d-none");
  }
}

//Searhing functionality
function searchProducts(searchValue) {
  matchingProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
      product.category.indexOf(searchValue.toLowerCase()) >= 0
    );
  });
  console.log(matchingProducts);
  return matchingProducts;
}
