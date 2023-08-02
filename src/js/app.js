import CategoryView from "./categoryView.js";
import ProductView from "./productView.js";

document.addEventListener("DOMContentLoaded", (e) => {
  CategoryView.setApp();
  CategoryView.createCategoryList()
  ProductView.setApp()
  ProductView.createProductListView()
});
