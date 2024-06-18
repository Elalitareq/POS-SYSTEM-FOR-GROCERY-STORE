import actionDAL from '../dal/actionDAL.js';

const listAllActions = async () => {
  return await actionDAL.getAllActions();
};

const findActionById = async id => {
  return await actionDAL.getActionById(id);
};

const createNewAction = async actionData => {
  return await actionDAL.createAction(actionData);
};

const modifyAction = async (id, actionData) => {
  return await actionDAL.updateAction(id, actionData);
};

const removeAction = async id => {
  return await actionDAL.deleteAction(id);
};

export default {
  listAllActions,
  findActionById,
  createNewAction,
  modifyAction,
  removeAction,
};
