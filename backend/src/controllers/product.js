import actionService from "../services/action.js";
import batchService from "../services/batch.js";
import productService from "../services/product.js";
import {
    getObjectChangesInArabicAndEnglish,
    getObjectAddInArabicAndEnglish,
} from "../utils/userAtions.js";

// POST /products - Add a new product
export async function addProduct(req, res) {
    const { productData, batches } = req.body;

    const newProduct = await productService.createNewProduct(productData);

    if (batches) {
        await batchService.createMultipleBatches(newProduct.id, batches);
    }
    if (newProduct) {
        const actionDescription = getObjectAddInArabicAndEnglish(
            newProduct,
            `أضافة منتج ${productData.name} `
        );

        await actionService.createNewAction(
            req.user.id,
            actionDescription.ar,
            actionDescription.en,
            "CREATE",
            `أضافة منتج ${productData.name} `
        );
    }

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct,
    });
}

export async function editProduct(req, res) {
    const data = req.body;
    const { id } = req.params;
    const oldProduct = await productService.findProductById(id);
    const updatedProduct = await productService.modifyProduct(id, data);

    const actionDescription = getObjectChangesInArabicAndEnglish(
        oldProduct,
        updatedProduct
    );

    const title =
        oldProduct.name === updatedProduct.name
            ? `تم التعديل على منتج ${oldProduct.name}ورمزه :${updatedProduct.sku}`
            : `تم التعديل على منتج ${updatedProduct.name}ورمزه :${updatedProduct.sku}`;

    if (actionDescription.isChanged) {
        console.log(actionDescription);
        await actionService.createNewAction(
            req.user.id,
            actionDescription.ar,
            actionDescription.en,
            "UPDATE",
            title
        );
    }

    res.status(201).json({
        message: "Product modify successfully",
        product: updatedProduct,
    });
}

export async function getAllProducts(_, res) {
    const productList = await productService.listAllProducts();

    res.status(201).json(productList);
}
export async function getProductById(req, res) {
    const { id } = req.params;
    const getProduct = await productService.findProductById(id);

    res.status(201).json(getProduct);
}

export async function deleteProduct(req, res) {
    const { id } = req.params;
    const deleted = await productService.removeProduct(id);
    if (deleted) {
        await actionService.createNewAction(
            req.user.id,
            `تم ازالة منتج ${deleted.name}`,
            `Deleted Product ${deleted.name}`,
            "DELETE"
        );
    }
}
// Other methods remain similar, handling only product-specific logic
