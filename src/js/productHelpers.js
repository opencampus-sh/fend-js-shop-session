export const fetchProducts = async () => {
  const productRequest = await fetch("/products.json");
  return productRequest.json();
};

export const getProductId = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
};
