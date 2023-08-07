import categoryView from "./categoryView.js";
import Storage from "./storage.js";

class ProductView {
  constructor() {
    this.products = [];
    this.existProductId = ""
    const addProductBtn = document.querySelector("#product-add-btn");
    const searchInput = document.querySelector("#product-search");
    const sort = document.querySelector("#sort")
    addProductBtn.addEventListener("click", (e) => this.addNewProduct(e,this.existProductId));
    searchInput.addEventListener("input", (e) =>this.productSearch(e.target.value));
    sort.addEventListener("input", (e) =>this.sortProducts(e.target.value));
  }
  addNewProduct(e,existProductId) {
    e.preventDefault();
    const productTitle = document.forms["product"]["product-title"].value;
    const productQty = document.forms["product"]["product-qty"].value;
    const productCategoryId =
      document.forms["product"]["select-category"].value;
    const productCategoryTitle = this._getCategoryTitle(productCategoryId);
    if (!productTitle || !productQty || !productCategoryTitle) return;
    Storage.saveProducts({
      id:Number(existProductId),
      title: productTitle,
      qty: productQty,
      category: productCategoryTitle,
    });
    this.products = Storage.getAllProducts();
    this.createProductListView(this.products);
    this.existProductId =""
    this._resetForm()
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  createProductListView(products = this.products) {
    let result = "";
    const productList = document.querySelector("#product-list");
    products.forEach((p) => {
      return (result += `<div class="flex flex-col gap-y-1">
          <div
            class="flex justify-between items-center w-full bg-white border border-slate-300 rounded-md px-2 py-1"
          >
            <h2 class="flex-4" id={product-title} data-id=${p.id}>${p.title}</h2>
            <div class="flex flex-8 items-center gap-x-3">
              <p>${new Date(p.createdAt).toLocaleDateString()}</p>
              <p
                class="border border-slate-300 bg-slate-300 text-white rounded-md px-3 py-1 text-sm"
              >
                ${p.category}
              </p>
              <span
                class="bg-slate-500 rounded-md flex justify-center items-center text-white text-xs py-1 px-2"
                >${p.qty}</span
              >
              <i id="edit-product-btn" data-id=${
                p.id
              } class="fa fa-pencil-alt text-blue-400 cursor-pointer"></i>
              <i id="delete-product-btn" data-id=${
                p.id
              } class="fa fa-trash-alt fa-lg text-red-400 cursor-pointer"></i>
            </div>
          </div>
        </div>`);
    });
    productList.innerHTML = result;
    const deleteProductBtns = [
      ...document.querySelectorAll("#delete-product-btn"),
    ];
    const editProductBtns = [
      ...document.querySelectorAll("#edit-product-btn"),
    ];
    deleteProductBtns.map((btn) =>
      btn.addEventListener("click", () => this._deleteProduct(btn.dataset.id))
    );
    editProductBtns.map((btn) =>
      btn.addEventListener("click", () => this._updateProduct(btn.dataset.id))
    );
  }
  _getCategoryTitle(id) {
    const findedCategory = Storage.getAllCategories().find(
      (c) => Number(c.id) === Number(id)
    );
    return findedCategory.title;
  }
  _deleteProduct(id) {
    const filteredProducts = this.products.filter(
      (p) => Number(p.id) !== Number(id)
    );
    this.products = filteredProducts;
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    this.createProductListView(filteredProducts);
  }
  _updateProduct(id){
    this.existProductId = id
    const findProduct = this.products.find(p=>Number(p.id)===Number(id))
    document.forms["product"]["product-title"].value=findProduct.title
    document.forms["product"]["product-qty"].value = findProduct.qty
    document.forms["product"]["select-category"].selected= findProduct.id
    categoryView.createCategoryList(findProduct.category)
    document.querySelector("#product-add-btn").innerHTML = "Update"
  }
  _resetForm(){
    document.forms["product"]["product-title"].value=""
    document.forms["product"]["product-qty"].value = ""
    categoryView.createCategoryList()
    document.querySelector("#product-add-btn").innerHTML = "Add"
  }
  productSearch(title) {
    const searchedProducts = this.products.filter((p) => {
      return p.title.trim().toLowerCase().includes(title.trim().toLowerCase());
    });
    this.createProductListView(searchedProducts);
  }
  sortProducts(value){
    this.products = Storage.getAllProducts(value)
    this.createProductListView(this.products)
  }
}

export default new ProductView();
