import { Unit } from "../core/types/index";
export const getUnits = (): Promise<Unit[]> => {
    let promise = new Promise<Unit[]>(function (myResolve, myReject) {
        setTimeout(() => {
            myResolve(require("./age-of-empires-units.json").units);
            myReject("error");
        }, 500); // Delay in milliseconds, adjust it for a delay if wanted
    });
    return promise;
}

export const getSelectedUnit = async (id: number) => {
    const units = await getUnits();
    const selectedUnit = units.find(item => item.id === id);
    
    if (selectedUnit) {
        return selectedUnit;
    } else {
        throw new Error("Unit not found");
    }
}