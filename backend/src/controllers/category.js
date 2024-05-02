import categoryServices from "../services/category.js";
import { makeError } from "../utils/functions.js";

export async function addCategory(req, res) {
    const data = req.body;
    const newCategory = await categoryServices.createNewCategory(data);
    if (newCategory) {
        res.status(201).json({
            message: "category created succesfuly",
            newCategory: newCategory,
        });
    } else {
        makeError("failed to create", 400);
    }
}

export async function editCategory(req, res) {
    const data = req.body;
    const { id } = req.params;
    const modifyCategory = await categoryServices.modifyCategory(id, data);
    if (modifyCategory) {
        res.status(201).json({
            message: "category modified succesfuly",
            modifyCategory: modifyCategory,
        });
    } else {
        makeError("failed to modify", 400);
    }
}

export async function getAllCategory(_, res) {
    const allCategories = await categoryServices.listAllCategories();
    if (allCategories) {
        res.status(201).json(allCategories);
    } else {
        makeError("failed to get categories", 400);
    }
}

export async function getCategoryById(req, res) {
    const { id } = req.params;
    const categoryById = await categoryServices.findCategoryById(id);
    if (categoryById) {
        res.status(201).json(categoryById);
    } else {
        makeError("failed to get category", 400);
    }
}

export async function removeCategory(req, res) {
    const { id } = req.params;
    const removeCategory = await categoryServices.removeCategory(id);
    if (removeCategory) {
        res.status(201).json(removeCategory);
    } else {
        makeError("failed to remove category", 400);
    }
}
