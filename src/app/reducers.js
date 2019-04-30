import { combineReducers } from "redux";

import { usersReducer, usersUtilsReducer } from "../users/usersReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  utils: usersUtilsReducer
});

export default rootReducer;
