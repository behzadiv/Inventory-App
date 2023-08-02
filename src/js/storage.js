export default class Storage {
  static saveCategories(categoryToSave) {
    const categories = Storage.getAllCategories();
    const existedCategory = categories.find((c) => c.id === categoryToSave.id);
    if (existedCategory) {
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
      (categoryToSave.id = new Date().getTime()),
        (categoryToSave.createdAt = new Date().toISOString()),
        categories.push(categoryToSave);
    }
    localStorage.setItem("categories", JSON.stringify(categories));
  }
  static getAllCategories() {
    const allCategories = JSON.parse(localStorage.getItem("categories")) || [];
    return allCategories.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() >
        0
        ? -1
        : 1;
    });
  }
  static getAllProducts() {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    return allProducts.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() >
        0
        ? -1
        : 1;
    });
  }
  static saveProducts(productToSave) {
    const allProducts = Storage.getAllProducts();
    const existedProduct = allProducts.find((p) => p.id === productToSave.id);
    if (existedProduct) {
      existedProduct.title = productToSave.title;
      existedProduct.qty = productToSave.qty;
      existedProduct.category = productToSave.category;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      allProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(allProducts));
  }
}
