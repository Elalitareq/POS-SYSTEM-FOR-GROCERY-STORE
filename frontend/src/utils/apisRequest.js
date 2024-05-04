import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// User APIS

export async function getAllUsers() {
    const getUser = await axios.get(url + "/api/users/user");
    return getUser.data;
}

export async function addUser(data, headers) {
    const addUser = await axios.post(url + "/api/users/create-user", data, {
        headers: {
            "Content-Type": "application/json",
            authorization: headers,
        },
    });
    return addUser.data;
}
export async function getUserById(id) {
    const getUserById = await axios.get(url + "/api/users/user/" + id);
    return getUserById.data;
}

export async function modifyUser(id, data, headers) {
    // console.log();
    const modifyUser = await axios.post(
        url + "/api/users/modify-user/" + id,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                authorization: headers,
            },
        }
    );
    return modifyUser.data;
}

// Category APIS

export async function getAllCategories() {
    const getCategories = await axios.get(url + "/api/categories/categories");
    return getCategories.data;
}

export async function addCategory(data) {
    const addCategory = await axios.post(
        url + "/api/categories/create-category",
        data
    );
    return addCategory.data;
}
export async function getCategoryById(id) {
    const getCategoryById = await axios.get(
        url + "/api/categories/category/" + id
    );
    return getCategoryById.data;
}

export async function modifyCategory(id, data) {
    const modifyCategory = await axios.post(
        url + "/api/categories/modify-category/" + id,
        data
    );
    return modifyCategory.data;
}

//product APIS
export async function addProduct(data) {
    const addProduct = await axios.post(
        url + "/api/products/create-product",
        data
    );
    return addProduct.data;
}
export async function getAllProduct(data) {
    const getProduct = await axios.get(url + "/api/products/products", data);
    return getProduct.data;
}

export async function getProductById(id) {
    const getProduct = await axios.get(url + "/api/products/products/" + id);
    return getProduct.data;
}

export async function modifyProduct(id, data) {
    const modifyProduct = await axios.post(
        url + "/api/products/modify-product/" + id,
        data
    );
    return modifyProduct.data;
}

//batch

export async function addBatch(data) {
    const addBatch = await axios.post(url + "/api/batches/create-batch", data);
    return addBatch.data;
}
export async function getAllBatch(data) {
    const getBatch = await axios.get(url + "/api/batches/batches", data);
    return getBatch.data;
}

export async function getBatchById(id) {
    const getBatch = await axios.get(url + "/api/batches/batches/" + id);
    return getBatch.data;
}

export async function modifyBatch(id, data) {
    const modifyBatch = await axios.post(
        url + "/api/batches/modify-batch/" + id,
        data
    );
    return modifyBatch.data;
}
