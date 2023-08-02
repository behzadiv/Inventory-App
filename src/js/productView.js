import Storage from "./storage.js";

class ProductView {
  constructor() {
    this.products = [];
    const addProductBtn = document.querySelector("#product-add-btn");
    addProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
  }
  addNewProduct(e) {
    e.preventDefault();
    const productTitle = document.forms["product"]["product-title"].value;
    const productQty = document.forms["product"]["product-qty"].value;
    const productCategoryId =
      document.forms["product"]["select-category"].value;
    const productCategoryTitle = this._getCategoryTitle(productCategoryId);
    if (!productTitle || !productQty || !productCategoryTitle) return;
    Storage.saveProducts({
      title: productTitle,
      qty: productQty,
      category: productCategoryTitle,
    });
    this.products = Storage.getAllProducts();
  }
  _getCategoryTitle(id) {
    const findedCategory = Storage.getAllCategories().find(
      (c) => Number(c.id) === Number(id)
    );
    return findedCategory.title;
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }
}

export default new ProductView();
