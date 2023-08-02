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
        ? 1
        : -1;
    });
  }
}
