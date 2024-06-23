import actionService from "../services/action.js";

export async function getAllAction(req, res) {
    const listAction = await actionService.listAllActions();
    res.status(200).json(listAction);
}

export default {
    getAllAction,
};
