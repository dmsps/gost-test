export const START_FETCH_USERS = "START_FETCH_USERS";
export const STOP_FETCH_USERS = "STOP_FETCH_USERS";
export const ERROR_FETCH_USERS = "ERROR_FETCH_USERS";
export const SELECT_USER = "SELECT_USER";

const startFetchUsersAction = () => ({
  type: START_FETCH_USERS
});

const stopFetchUsersAction = data => ({
  type: STOP_FETCH_USERS,
  users: { data }
});

const errorFetchUsersAction = payload => ({
  type: ERROR_FETCH_USERS,
  payload: payload
});

const selectUserAction = (selectedId, selectedData = {}) => ({
  type: SELECT_USER,
  selected: {
    id: selectedId,
    ...selectedData
  }
});

export {
  startFetchUsersAction,
  stopFetchUsersAction,
  errorFetchUsersAction,
  selectUserAction
};
