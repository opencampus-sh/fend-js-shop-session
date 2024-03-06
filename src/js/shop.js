// import productData from "../public/products.json";
import productImgPath from "../images/product.jpg";
import { fetchProducts } from "./productHelpers";

// console.log(productData);

// async function fetchProducts() {
//   console.log("test");
// }

const buildProductHtml = async () => {
  const productData = await fetchProducts();
  
  return productData.map(
    (product) => `
    <a href="/product/index.html?id=${product.id}" class="product">
      <img src="${productImgPath}" alt="product image">
      <div class="product-name">
        ${product.productName}
      </div>
      <div class="product-price">
        ${product.price / 100}€
      </div>
    </a>
  `).join("");
}

const shop = async () => {
  const productHtml = await buildProductHtml();
  
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = productHtml;
}

shop();