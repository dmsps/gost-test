import axios from "../app/axios";

import {
  startFetchUsersAction,
  stopFetchUsersAction,
  errorFetchUsersAction,
  selectUserAction
} from "./usersActions";

const getUsers = () => {
  return async dispatch => {
    try {
      dispatch(startFetchUsersAction());
      let response = await axios({
        method: "get",
        url: "/features"
      });
      dispatch(stopFetchUsersAction(response.data));
    } catch (e) {
      dispatch(errorFetchUsersAction(e));
    }
  };
};

const selectUser = (id, data) => {
  return dispatch => {
    dispatch(selectUserAction(id, data));
  };
};

export { getUsers, selectUser };
