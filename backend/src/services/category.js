import categoryDAL from '../dal/category.js';

const listAllCategories = async () => await categoryDAL.getAllCategories();

const findCategoryById = async (id) => await categoryDAL.getCategoryById(id);

const createNewCategory = async (categoryData) => await categoryDAL.createCategory(categoryData);

const modifyCategory = async (id, categoryData) => await categoryDAL.updateCategory(id, categoryData);

const removeCategory = async (id) => await categoryDAL.deleteCategory(id);

export default {
  listAllCategories,
  findCategoryById,
  createNewCategory,
  modifyCategory,
  removeCategory,
};
