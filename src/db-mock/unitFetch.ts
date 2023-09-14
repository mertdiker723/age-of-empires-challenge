export const getUnits = () => {
    let promise = new Promise(function (myResolve, myReject) {
        setTimeout(() => {
            myResolve(require("./age-of-empires-units.json").units);
            myReject("error");
        }, 500); // Delay in milliseconds, adjust it for a delay if wanted
    });
    return promise;
}