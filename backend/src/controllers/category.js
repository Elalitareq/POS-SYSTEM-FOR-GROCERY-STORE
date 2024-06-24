import categoryServices from "../services/category.js";
import { makeError } from "../utils/functions.js";
import actionService from "../services/action.js";
import {
    getObjectAddInArabicAndEnglish,
    getObjectChangesInArabicAndEnglish,
} from "../utils/userAtions.js";

export async function addCategory(req, res) {
    const data = req.body;
    const newCategory = await categoryServices.createNewCategory(data);
    if (newCategory) {
        const actionDescription = getObjectAddInArabicAndEnglish(
            newCategory,
            `أضافة صنف ${newCategory.name} `
        );

        await actionService.createNewAction(
            req.user.id,
            actionDescription.ar,
            actionDescription.en,
            "CREATE",
            `أضافة صنف ${newCategory.name} `
        );

        res.status(201).json({
            message: "category created succesfuly",
            newCategory,
        });
    } else {
        makeError("failed to create", 400);
    }
}

export async function editCategory(req, res) {
    const data = req.body;
    const { id } = req.params;
    const findCategory = await categoryServices.findCategoryById(id);
    const modifyCategory = await categoryServices.modifyCategory(id, data);

    console.log(modifyCategory);
    console.log(findCategory);
    if (modifyCategory) {
        const actionDescription = getObjectChangesInArabicAndEnglish(
            findCategory,
            modifyCategory
        );

        console.log(actionDescription);
        const title =
            modifyCategory.name === findCategory.name
                ? `تم التعديل على صنف ${findCategory.name} `
                : `تم التعديل على صنف ${modifyCategory.name}`;

        if (actionDescription.isChanged) {
            await actionService.createNewAction(
                req.user.id,
                actionDescription.ar,
                actionDescription.en,
                "UPDATE",
                title
            );
        }
        res.status(201).json({
            message: "category modified succesfuly",
            modifyCategory,
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
        await actionService.createNewAction(
            req.user.id,
            `تم ازالة صنف ${removeCategory.name}`,
            `Deleted Category ${removeCategory.name}`,
            "DELETE"
        );

        res.status(201).json(removeCategory);
    } else {
        makeError("failed to remove category", 400);
    }
}
