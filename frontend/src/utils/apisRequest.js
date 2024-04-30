import axios from "axios";

const url = process.env.REACT_APP_API_URL;

async function getAllUsers() {
    const getUser = await axios.get(url + "/api/users/user");
    return getUser.data;
}

export { getAllUsers };
