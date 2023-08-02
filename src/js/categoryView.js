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
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoryList() {
    const categoryDom = document.querySelector("#select-category");
    let result = `<option value="">Select Category</option>`;
    this.categories.forEach(
      (c) => (result += `<option value=${c.id}>${c.title}</option>`)
    );
    return (categoryDom.innerHTML = result);
  }
}

export default new CategoryView(); 
