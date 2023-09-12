export const getUnits = () => {
    let promise = new Promise(function (myResolve, myReject) {
        myResolve(require("./age-of-empires-units.json").units);
        myReject("error");
    });
    return promise;
}