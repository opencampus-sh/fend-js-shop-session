import { fetchProducts } from "./productHelpers";
import productImgPath from "../images/product.jpg";
import { getProductId } from "./productHelpers";
import { addToCart } from "./cart";

const product = async () => {
  const productData = await fetchProducts();
  const productId = getProductId();

  const product = productData.find(
    (singleProduct) => singleProduct.id === parseInt(productId, 10)
  );

  const productHtml = `
    <div class="product">
      <img src="${productImgPath}" alt="product image">
      <div class="product-name">
        ${product.productName}
      </div>
      <div class="product-price">
        ${product.price / 100}€
      </div>
      <div class="product-description">
        ${product.description}
      </div>
      <button data-id="${product.id}" class="add-to-cart-button">In den Warenkorb</button>
    </div>
  `;

  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = productHtml;
  const addToCartButton = document.querySelector(".add-to-cart-button");

  addToCartButton.addEventListener("click", addToCart);
};

product();
