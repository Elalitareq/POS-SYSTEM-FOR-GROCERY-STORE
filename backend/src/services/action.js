import actionDAL from "../dal/action.js";

const listAllActions = async () => await actionDAL.getAllActions();

const findActionById = async (id) => await actionDAL.getActionById(id);

const createNewAction = async (
    userId,
    descriptionAr,
    descriptionEn,
    actionType,
    title
) => {
    const action = {
        userId: userId,
        title: title,
        description: {
            en: descriptionEn,
            ar: descriptionAr,
        },
        actionType: actionType,
    };

    const newAction = await actionDAL.createAction(action);

    return newAction;
};

const modifyAction = async (id, actionData) =>
    await actionDAL.updateAction(id, actionData);

const removeAction = async (id) => await actionDAL.deleteAction(id);

const actionService = {
    listAllActions,
    findActionById,
    createNewAction,
    modifyAction,
    removeAction,
};

export default actionService;
