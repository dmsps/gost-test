import {
  START_FETCH_USERS,
  STOP_FETCH_USERS,
  ERROR_FETCH_USERS,
  SELECT_USER
} from "./usersActions";

let initialState = {
  loading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH_USERS:
      return {
        ...state.users,
        loading: true
      };
    case STOP_FETCH_USERS:
      return {
        ...state.users,
        loading: false,
        ...action.users
      };
    case ERROR_FETCH_USERS:
      return {
        ...state.users,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

const usersUtilsReducer = (state = { selected: null }, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        selected: {
          ...action.selected
        }
      };

    default:
      return state;
  }
};

export { usersReducer, usersUtilsReducer };
