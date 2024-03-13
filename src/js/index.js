import myFunction, { multiply } from "./myModule";
import { renderCart } from "./cart";

myFunction();

const result = multiply(2, 5);

console.log(result);

const openCartButton = document.querySelector(".open-cart-button");
const closeCartButton = document.querySelector(".close-cart-button");
const cart = document.querySelector(".cart");
openCartButton.addEventListener("click", () => {
  cart.classList.toggle("open");
});

closeCartButton.addEventListener("click", () => {
  cart.classList.toggle("open");
});

renderCart();
