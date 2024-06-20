import actionDAL from '../dal/actionDAL.js';

const listAllActions = async () => await actionDAL.getAllActions();

const findActionById = async (id) => await actionDAL.getActionById(id);

const createNewAction = async (actionData) => await actionDAL.createAction(actionData);

const modifyAction = async (id, actionData) => await actionDAL.updateAction(id, actionData);

const removeAction = async (id) => await actionDAL.deleteAction(id);

export default {
  listAllActions,
  findActionById,
  createNewAction,
  modifyAction,
  removeAction,
};
