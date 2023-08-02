import Storage from "./storage.js";

const categoryAddBtn = document.querySelector("#category-add-btn");

class CategoryView {
  constructor() {
    categoryAddBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    const title = document.forms["category"]["category-title"].value;
    const description =
      document.forms["category"]["category-description"].value;
    e.preventDefault();
    if (!title) return;
    Storage.saveCategories({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoryList();
  }
}

export default new CategoryView(); 
