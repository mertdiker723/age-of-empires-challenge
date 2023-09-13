import { combineReducers } from "redux";
import { unitReducer } from './unitReducer';

const rootReducer = combineReducers({
    unitReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;