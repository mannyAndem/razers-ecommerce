let cartDisplay = document.querySelector("#cart-products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let proceedBtn = document.querySelector("#proceed-btn");
let cartTotal = document.querySelector("#cart-total");

//Getting the cart fom local storage and parsing it into a new instance of the CartProduct class
function fetchCart() {
  class CartProduct {
    constructor(object) {
      this.name = object.name;
      this.price = object.price;
      this.category = object.category;
      this.description = object.description;
      this.image = object.image;
    }
    renderToCart() {
      cartDisplay.innerHTML += `
        <div class="row align-items-center justify-content-between p-0 p-2 my-4 border border-success w-100">
                <div class="col-5 d-flex gap-2 align-items-center">
                  <img 
                    src="${this.image}"
                    alt=""
                    class="cart-img"
                  />
                  <h2 class=" fs-6 fs-xl-5">${this.name}</h2>
                </div>
                <span class="lead text-success col-4 fs-6 fs-lg-5">N${this.price.toLocaleString()}</span>
                <button class="btn col-2 btn-danger remove-from-cart-btn">X</button>
              </div>`;
    }
    addToCart() {
      cart.push(this);
    }
    removeFromCart() {
      cart.splice(cart.indexOf(this), 1);
    }
  }
  //If cart has products in it, map each product to a new instance of the CartProduct class
  if (cart.length >= 1) {
    cart = cart.map((product) => {
      return new CartProduct(product);
    });
  }
}
function displayCart() {
  //If cart has products, render the products, else tell the user no products have been added and change the cta btn to open the products page.
  if (cart.length >= 1) {
    cartDisplay.innerHTML = "";
    cart.forEach((product) => {
      product.renderToCart();
    });
    cartTotal.innerHTML = `N${cart
      .reduce((acc, product) => acc + product.price, 0)
      .toLocaleString()}.00`;
    proceedBtn.addEventListener("click", () => {
      window.open("/pages/checkout.html", "_self");
    });
  } else {
    cartDisplay.innerHTML = `<p class="text-danger fs-5">You haven't added any products to the cart :(</p>`;
    cartTotal.innerHTML = "N0.00";
    proceedBtn.innerText = "Get Back to Shopping";
    proceedBtn.addEventListener("click", () => {
      window.open("/pages/products.html", "_self");
    });
  }
}

//Adding event handler to the remove-from-cart btn

cartDisplay.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart-btn")) {
    const productTarget = e.target.parentElement.querySelector("h2").innerText;
    cart.forEach((product) => {
      if (product.name == productTarget) {
        product.removeFromCart();
      }
    });
    updateCart();
    displayCart();
  }
});

//updating the cart in local storage
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

fetchCart();
displayCart();
