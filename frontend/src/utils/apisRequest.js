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
