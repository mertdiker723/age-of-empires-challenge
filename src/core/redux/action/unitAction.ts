import * as unitApi from '../../../db-mock/unitFetch';
import { Unit } from '../../types';

const loadUnitsSuccess = (type: string, units: Unit[]) => {
    return { type, units }
}

export const loadUnits = (type: string) => {
    return function (dispatch: any) {
        return unitApi.getUnits()
            .then(unit => {
                dispatch(loadUnitsSuccess(type, unit as Unit[]))
            })
            .catch(error => console.log("Error: ", error))
    }
}