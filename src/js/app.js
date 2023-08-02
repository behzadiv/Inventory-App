import CategoryView from "./categoryView.js";
import ProductView from "./productView.js";

const searchInput = document.querySelector("#product-search");
searchInput.addEventListener("input" , (e)=>ProductView.productSearch(e.target.value))

document.addEventListener("DOMContentLoaded", (e) => {
  CategoryView.setApp();
  CategoryView.createCategoryList();
  ProductView.setApp();
  ProductView.createProductListView();
});
