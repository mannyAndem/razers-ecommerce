class CompleteOrderProduct {
  constructor(object) {
    this.name = object.name;
    this.price = object.price;
    this.category = object.category;
    this.description = object.description;
    this.image = object.image;
  }
  render() {
    confirmProductList.innerHTML += `
      <li class="my-3 row g-1">
      <span class="name col me-3">${this.name}</span
      ><span class="price col">N${this.price.toLocaleString()}</span>
    </li>`;
  }
}

//Get the cart objects from local storage, parse to a new CompleteOrderProduct class then render
const confirmProductList = document.querySelector("#confirm-product-list");
const products = JSON.parse(localStorage.getItem("cart"));
const total = document.querySelector("#total");
const deliveryAddress = document.querySelector("#address");
parsedProducts = [];
products.forEach((product) => {
  parsedProducts.push(new CompleteOrderProduct(product));
});
confirmProductList.innerHTML = "";
parsedProducts.forEach((product) => product.render());

//Rendering the total
total.innerHTML = `N${parsedProducts
  .reduce((acc, curr) => {
    acc += curr.price;
    return acc;
  }, 0)
  .toLocaleString()}`;

//Rendering the delivery address
deliveryAddress.innerHTML = localStorage.getItem("deliveryAddress");

//Confirm-order btn event handler
const confirmOrderBtn = document.querySelector("#confirm-order-btn");
confirmOrderBtn.addEventListener("click", () => {
  const confirmationSection = document.querySelector("#confirmation-section");
  const orderConfirmed = document.querySelector("#order-confirmed-section");
  confirmationSection.classList.add("d-none");
  orderConfirmed.classList.remove("d-none");

  //Clear cart from local storage
  localStorage.removeItem("cart");
});
