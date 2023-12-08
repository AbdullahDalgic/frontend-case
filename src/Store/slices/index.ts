import { combineReducers } from "redux";
import categories from "./categories";

const reducer = combineReducers({
  categories: categories,
});

export default reducer;
