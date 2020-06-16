import { combineReducers } from "redux";
import { StoreState } from "../store/types";
import userMisc from "./user";

export default combineReducers<StoreState>({
    userMisc,
});
