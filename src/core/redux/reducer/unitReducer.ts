import { Unit } from "../../types";
import { Types } from "../action/actionTypes";

type ActionType = {
    type: string;
    units: Unit[];
}
export const unitReducer = (state = [], action: ActionType) => {
    switch (action.type) {
        case Types.UNIT_READ_SUCCESS:
            return action.units;
        default:
            return state;
    }
}