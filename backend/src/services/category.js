import categoryDAL from "../dal/category.js";

const listAllCategories = async () => {
  return await categoryDAL.getAllCategories();
};

const findCategoryById = async (id) => {
  return await categoryDAL.getCategoryById(id);
};

const createNewCategory = async (categoryData) => {
  return await categoryDAL.createCategory(categoryData);
};

const modifyCategory = async (id, categoryData) => {
  return await categoryDAL.updateCategory(id, categoryData);
};

const removeCategory = async (id) => {
  return await categoryDAL.deleteCategory(id);
};

export default {
  listAllCategories,
  findCategoryById,
  createNewCategory,
  modifyCategory,
  removeCategory,
};
