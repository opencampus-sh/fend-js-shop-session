import { fetchProducts } from "./productHelpers";
import productImgPath from "../images/product.jpg";

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

export const addToCart = (event) => {
  const productId = parseInt(event.target.dataset.id, 10);
  console.log(productId);

  const existingCart = loadCart();

  console.log("existing cart", existingCart);

  if (existingCart) {
    const existingProduct = existingCart.find(
      (cartProduct) => cartProduct.productId === productId
    );
    if (existingProduct) {
      // Existing cart, existing product
      console.log("Existing cart, existing product");
      const updatedCart = existingCart.map((product) => {
        if (product.productId === productId) {
          // Increase the product's amount
          console.log("Increase the product's amount");
          return {
            ...product,
            amount: product.amount + 1,
          };
        }
        // Do nothing
        console.log("Do nothing");
        return product;
      });
      saveCart(updatedCart);
    } else {
      // Existing cart, new product
      console.log("Existing cart, new product");
      const updatedCart = [...existingCart, { productId, amount: 1 }];
      saveCart(updatedCart);
    }
  } else {
    // New cart, new product
    console.log("New cart, new product");
    const newCart = [{ productId, amount: 1 }];

    saveCart(newCart);
  }
  renderCart();
};

export const removeFromCart = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const productId = parseInt(event.target.dataset.id, 10);
  console.log(productId);

  const existingCart = loadCart();

  console.log("existing cart", existingCart);

  const updatedCart = existingCart.filter((cartItem) => cartItem.productId !== productId);

  console.log("updated cart after deletion", updatedCart);

  saveCart(updatedCart);

  renderCart();
}

export const renderCart = async () => {
  const existingCart = loadCart();
  const productData = await fetchProducts();
  let subTotal = 0;

  const cartHtml = existingCart.map((cartItem) => {
    const currentProduct = productData.find((product) => product.id === cartItem.productId);
    subTotal = subTotal + currentProduct.price * cartItem.amount;
    return `
      <a href="/product/index.html?id=${currentProduct.id}" class="product">
      <img src="${productImgPath}" alt="product image">
      <div class="product-name">
        ${currentProduct.productName}
      </div>
      <div>Amount: ${cartItem.amount}</div>
      <div class="product-price">
        ${cartItem.amount} x ${currentProduct.price / 100}€ = ${currentProduct.price / 100 * cartItem.amount}€
      </div>
      <button class="delete-from-cart-button" data-id="${currentProduct.id}">Delete from Cart</button>
    </a>
    `;
  }).join("");

  const total = (subTotal + 500) / 100;

  const cartContainer = document.querySelector(".cart-content");
  const subTotalContainer = document.querySelector(".sub-total");
  const totalContainer = document.querySelector(".total");
  cartContainer.innerHTML = cartHtml;

  const deleteFromCartButton = document.querySelector(
    ".delete-from-cart-button"
  );

  deleteFromCartButton?.addEventListener("click", removeFromCart);

  subTotalContainer.innerHTML = `${subTotal / 100}€`;
  totalContainer.innerHTML = `${total}€`;
};

export default addToCart;
